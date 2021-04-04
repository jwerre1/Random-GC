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
  months: ['04', '10']
}

const baseURL = 'https://www.churchofjesuschrist.org';
const language = '?lang=eng';

const conferenceLink = link => {
  const linkRegex = /^\/study\/general-conference\//;
  return linkRegex.test(link.href)
}

const notSidebar = link => (link.classList.length === 0);

const parsePage = data => {
  const dom = new JSDOM(data);

  const title = dom.window.document.getElementById('title1');
  const subtitle = [...dom.window.document.getElementsByClassName('subtitle')];
  let speakerElement;
  try {
    speakerElement = dom.window.document.getElementById('p1');
  } catch {
    speakerElement = dom.window.document.getElementById('title1');
  }
  if (!speakerElement) return { speaker: "no speaker" };
  let returnTitle = title.textContent;
  if (subtitle.length) subtitle.forEach(sub => returnTitle += sub.textContent);
  return {
    speaker: speakerElement.textContent.trim(),
    title: returnTitle,
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
      let talkArr = [];
      let speakerArr = [];
      let conferenceArr = [];
      for (let i = parms.start; i <= parms.end; i++) {
        for (const m of parms.months) {
          const url = baseURL + '/study/general-conference/' + i.toString() + "/" + m + language;

          const response = await axios.get(url);
          const dom = new JSDOM(response.data);
          const nodeList = [...dom.window.document.querySelectorAll('a')];

          const links = await nodeList.filter(conferenceLink).filter(notSidebar);
          for (const link of links) {
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
