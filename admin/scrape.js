const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Talk = require('../model/Talk');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');

const parms = {
  start: 1971,
  end: 1971,
  months: ['04']
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
    speaker: speakerElement.textContent,
    title: returnTitle,
  }
}

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(async () => {
  db = await mongoose.createConnection(process.env.DB_CONNECT, opts);
  for (let i = parms.start; i <= parms.end; i++) {
    parms.months.forEach(async (m) => {
      const url = baseURL + '/study/general-conference/' + i.toString() + "/" + m + language;

      const response = await axios.get(url);
      const dom = new JSDOM(response.data);
      const nodeList = [...dom.window.document.querySelectorAll('a')];

      nodeList.filter(conferenceLink).filter(notSidebar).forEach(async (link) => {
        const talkLink = baseURL + link.href;
        const pageResponse = await axios.get(talkLink);
        const parsedPage = await parsePage(pageResponse.data);

        if (parsedPage.speaker !== "no speaker") {
          const talk = new Talk({
            title: parsedPage.title,
            url: talkLink
          })
          console.log(talk);
          try {
            const savedTalk = await talk.save();
            console.log(`${savedTalk.title} saved`)
          } catch (error) {
            console.log(error);
          }
        }
      })
    })
  }
})();
