/** Scrape from page that lists all speakers,
 *  with links to page with all talks.
 *  - Better for large scrapes (such as all available talks)
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Talk = require('../models/Talk');
const Speaker = require('../models/Speaker');
const Conference = require('../models/Conference');

const dbTools = require('./tools/db');

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
        let speakerObj = await dbTools.findSpeaker(speaker);
        if (!speakerObj) speakerObj = await dbTools.setSpeaker(speaker);
        if (!speakerObj) {
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
          const talkObj = await dbTools.findTalk(talkLink);
          if (talkObj) {
            console.log(`No Update: Talk saved previously ${talkLink}`);
            continue talkLoop; //Talk already saved.
          }

          const title = talk.querySelector('h4').textContent;
          const conference = talk.querySelector('h6').textContent;
          let conferenceObj = await dbTools.findConference(conference);
          if (!conferenceObj) conferenceObj = await dbTools.setConference(conference);
          if (!conferenceObj) {
            console.log(`ERROR: Couldn't process conference ${conference}.`)
            continue talkLoop; //error finding/creating conference
          }

          const newTalk = new Talk({
            title: title,
            url: talkLink,
            speaker: speakerObj._id,
            conference: conferenceObj._id
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