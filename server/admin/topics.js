const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Talk = require('../models/Talk');
const Topic = require('../models/Topic');

const dbTools = require('./tools/db');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');

const topicsURL = 'https://www.churchofjesuschrist.org/study/general-conference/topics?lang=eng';
const baseURL = 'https://www.churchofjesuschrist.org';
const language = '?lang=eng';

const topicsLink = link => {
  const linkRegex = /^\/study\/general-conference\/topics\//;
  return linkRegex.test(link.href)
}

const conferenceLink = link => {
  const linkRegex = /^\/study\/general-conference\/[1-2]/;
  return linkRegex.test(link.href)
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
      const response = await axios.get(topicsURL);
      const dom = new JSDOM(response.data);
      const nodeList = [...dom.window.document.querySelectorAll('a')];

      const links = await nodeList.filter(topicsLink);

      topicLoop:
      for (const link of links) {
        const topicLink = baseURL + link.href + language;
        const topicname = link.querySelector('h4').textContent;
        let topicID = await dbTools.findTopic(topicname);
        if (!topicID) topicID = await dbTools.setTopic(topicname);
        if (!topicID) {
          console.log(`ERROR: Couldn't process topic ${topicname}.`)
          continue topicLoop; //error finding/creating topic
        }

        const pageResponse = await axios.get(topicLink);
        const topicDom = new JSDOM(pageResponse.data);
        const topicNodeList = [...topicDom.window.document.querySelectorAll('a')];
        const talks = await topicNodeList.filter(conferenceLink);
        talkLoop:
        for (const talk of talks) {
          const talkLink = talk.href;
          const talkID = await dbTools.findTalk(talkLink);
          if (!talkID) {
            console.log(`ERROR: Couldn't locate talk ${talkLink}`);
            continue talkLoop; //Talk couldn't be found in database.
          }

          try {
            const topicres = await Topic.updateOne(
              { _id: topicID },
              { $push: { talks: talkID } }
            )
            const talkres = await Talk.updateOne(
              { _id: talkID },
              { $push: { topics: topicID } }
            )
            console.log(`Updated: ${topicname} --- ${talkLink}`)
          } catch (error) {
            console.log(error);
          }
        }
      }
      console.log("process complete");
    })
})();

