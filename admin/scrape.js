const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Talk = require('../model/Talk');
const Speaker = require('../model/Speaker');
const Conference = require('../model/Conference');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');

const parms = {
  start: 1971,
  end: 2020,
  months: [
    {
      number: '04',
      month: 'April'
    }, {
      number: '10',
      month: 'October'
    }
  ]
}

const baseURL = 'https://www.churchofjesuschrist.org';
const language = '?lang=eng';

const conferenceLink = link => {
  const linkRegex = /^\/study\/general-conference\//;
  return linkRegex.test(link.href)
}

const sidebar = link => (link.className.indexOf('item-3cCP7') !== -1);

const findTalk = async input => {
  const returnValue = await Talk.findOne({ 'url': input }, (err, res) => {
    if (err || !res) return 0;
    return res._id;
  });
  return returnValue
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
      for (let i = parms.start; i <= parms.end; i++) {
        for (const m of parms.months) {
          const url = baseURL + '/study/general-conference/' + i.toString() + "/" + m.number + language;

          const response = await axios.get(url);
          const dom = new JSDOM(response.data);
          const nodeList = [...dom.window.document.querySelectorAll('a')];

          const links = await nodeList.filter(conferenceLink).filter(sidebar);

          talkLoop:
          for (const link of links) {
            const talkLink = link.href;
            const talkID = await findTalk(talkLink);
            if (talkID) {
              console.log(`No Update: Talk saved previously ${talkLink}`);
              continue talkLoop; //Talk already saved.
            }







            const talkLink = baseURL + link.href;
            const pageResponse = await axios.get(talkLink);
            const parsedPage = await parsePage(pageResponse.data);

            if (parsedPage.speaker !== "no speaker") {
              let findSpeaker = speakerArr.find(element => element.name === parsedPage.speaker)
              let speakerId;
              if (findSpeaker) {
                speakerId = findSpeaker._id;
                console.log('duplicate speaker found')
              }
              else {
                const speaker = new Speaker({
                  name: parsedPage.speaker
                });
                speakerArr.push(speaker);
                speakerId = speaker._id;
                try {
                  const savedSpeaker = await speaker.save();
                  console.log(`speaker ${speaker.name} saved!`);
                } catch (error) {
                  console.log(error);
                }
              }
              let findConference = conferenceArr.find(element =>
                (element.year === i && element.month === parseInt(m))
              )
              let conferenceId;
              if (findConference) conferenceId = findConference._id;
              else {
                const conference = new Conference({
                  year: i,
                  month: parseInt(m)
                })
                conferenceArr.push(conference);
                conferenceId = conference._id;
                try {
                  const savedConference = await conference.save();
                  console.log(`conference ${m}/${i} saved!`);
                } catch (error) {
                  console.log(error);
                }
              }
              const talk = new Talk({
                title: parsedPage.title,
                url: talkLink,
                speaker: speakerId,
                conference: conferenceId
              });
              try {
                const savedTalk = await talk.save();
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
          };
        }
      }
    })
})();
