const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Talk = require('../model/Talk');
const Speaker = require('../model/Speaker');
const Conference = require('../model/Conference');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');

const speakersURL = 'https://www.churchofjesuschrist.org/study/general-conference/speakers?lang=eng';
const baseURL = 'https://www.churchofjesuschrist.org';
const language = '?lang=eng';

const speakersLink = link => {
  const linkRegex = /^\/study\/general-conference\/speakers\//;
  return linkRegex.test(link.href)
}

const conferenceLink = link => {
  const linkRegex = /^\/study\/general-conference\/[1-2]/;
  return linkRegex.test(link.href)
}

const notPicture = link => (link.className.indexOf('omeqik-0') !== -1);

const findTalk = async input => {
  const returnValue = await Talk.findOne({ 'url': input }, (err, res) => {
    if (err || !res) return 0;
    return res._id;
  });
  return returnValue
}

const findSpeaker = async input => {
  const returnValue = await Speaker.findOne({ 'name': input }, (err, res) => {
    if (err || !res) return 0;
    return res._id;
  });
  return returnValue
}

const setSpeaker = async input => {
  const speaker = new Speaker({
    name: input
  });
  try {
    const savedSpeaker = await speaker.save();
    console.log(`speaker ${savedSpeaker.name} saved!`);
    return savedSpeaker._id;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

const findConference = async input => {
  const arr = input.split(' ');
  const month = arr[0];
  const year = parseInt(arr[1]);
  const returnValue = await Conference.findOne({ 'month': month, 'year': year }, (err, res) => {
    if (err || !res) return 0;
    return res._id;
  });
  return returnValue
}

const setConference = async input => {
  const arr = input.split(' ');
  const month = arr[0];
  const year = parseInt(arr[1]);
  const conference = new Conference({
    year,
    month
  });
  try {
    const savedConference = await conference.save();
    console.log(`conference ${savedConference.month} ${savedConference.year} saved!`);
    return savedConference._id;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

(() => {
  mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async () => {
      console.log("connected to db");
      const response = await axios.get(speakersURL);
      const dom = new JSDOM(response.data);
      const nodeList = [...dom.window.document.querySelectorAll('a')];

      const links = await nodeList.filter(speakersLink).filter(notPicture);

      speakerLoop:
      for (const link of links) {
        const speakerLink = baseURL + link.href + language;
        const speaker = link.querySelector('h4').textContent;
        let speakerID = await findSpeaker(speaker);
        if (!speakerID) speakerID = await setSpeaker(speaker);
        if (!speakerID) {
          console.log(`ERROR: Couldn't process speaker ${speaker}.`)
          continue speakerLoop; //error finding/creating speaker
        }

        const pageResponse = await axios.get(speakerLink);
        const speakerDom = new JSDOM(pageResponse.data);
        const speakerNodeList = [...speakerDom.window.document.querySelectorAll('a')];
        const talks = await speakerNodeList.filter(conferenceLink);
        talkLoop:
        for (const talk of talks) {
          const talkLink = talk.href;
          const talkID = await findTalk(talkLink);
          if (talkID) {
            console.log(`No Update: Talk saved previously ${talkLink}`);
            continue talkLoop; //Talk already saved.
          }

          const title = talk.querySelector('h4').textContent;
          const conference = talk.querySelector('h6').textContent;
          let conferenceID = await findConference(conference);
          if (!conferenceID) conferenceID = await setConference(conference);
          if (!conferenceID) {
            console.log(`ERROR: Couldn't process conference ${conference}.`)
            continue talkLoop; //error finding/creating conference
          }

          const newTalk = new Talk({
            title: title,
            url: talkLink,
            speaker: speakerID,
            conference: conferenceID
          });
          try {
            const savedTalk = await newTalk.save();
            const talkres = await Speaker.updateOne(
              { _id: savedTalk.speaker },
              { $push: { talks: savedTalk._id } }
            )
            const confres = await Conference.updateOne(
              { _id: savedTalk.conference },
              { $push: { talks: savedTalk._id } }
            )
          } catch (error) {
            console.log(error);
          }
        }
      }
      console.log("process complete");
    })
})();