/** Scrape by session, from "home" page that lists all talks for given session
 *  - scrape name and links from side bar -> provides speaker naming consistency
 *    - no titles (Elder, Sister, etc.)
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Talk = require("../models/Talk");
const Speaker = require("../models/Speaker");
const Conference = require("../models/Conference");

const dbTools = require("./tools/db");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");

// Set start and end date + months for scrape
const parms = {
  start: 1971,
  end: 2021,
  months: ["04", "10"],
};

const baseURL = "https://www.churchofjesuschrist.org";
const language = "?lang=eng";

const conferenceLink = (link) => {
  const linkRegex = /^\/study\/general-conference\/[1-2]/;
  return linkRegex.test(link.href);
};

const sidebar = (link) => link.className.indexOf("item-3cCP7") !== -1;

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
        sessionLoop: for (const m of parms.months) {
          const url =
            baseURL +
            "/study/general-conference/" +
            i.toString() +
            "/" +
            m +
            language;

          let response;
          try {
            response = await axios.get(url);
          } catch (error) {
            console.log(`ERROR: Issue getting session --- ${error}`);
            return; //stop program so it can be run again starting at session causing error.
          }

          const dom = new JSDOM(response.data);
          const nodeList = [...dom.window.document.querySelectorAll("a")];

          const links = await nodeList.filter(conferenceLink).filter(sidebar);

          const conference =
            dom.window.document.querySelector("h1").textContent;
          let conferenceObj = await dbTools.findConference(conference);
          if (!conferenceObj)
            conferenceObj = await dbTools.setConference(conference);
          if (!conferenceObj) {
            console.log(`ERROR: Couldn't process conference ${conference}.`);
            continue sessionLoop; //error finding/creating conference
          }

          talkLoop: for (const link of links) {
            const linkParts = link.href.split("?");
            const talkLink = linkParts[0];
            const talkObj = await dbTools.findTalk(talkLink);
            if (talkObj) {
              console.log(`No Update: Talk saved previously ${talkLink}`);
              continue talkLoop; //Talk already saved.
            }
            const speakerList = [
              ...link.getElementsByClassName("subtitle-MuO4X"),
            ];
            if (speakerList.length !== 1) {
              console.log(`ERROR: Multiple/no speakers found for ${talkLink}.`);
              continue talkLoop;
            }
            const speaker = speakerList[0].textContent;
            let speakerObj = await dbTools.findSpeaker(speaker);
            if (!speakerObj) speakerObj = await dbTools.setSpeaker(speaker);
            if (!speakerObj) {
              console.log(`ERROR: Couldn't process speaker ${speaker}.`);
              continue talkLoop; //error finding/creating speaker
            }
            const title = link.querySelector("span").textContent;
            if (!title) {
              console.log(`ERROR: Couldn't locate title for ${talkLink}.`);
              continue talkLoop; //error finding/creating speaker
            }
            const newTalk = new Talk({
              title: title,
              url: talkLink,
              speaker: speakerObj._id,
              conference: conferenceObj._id,
            });
            try {
              const savedTalk = await newTalk.save();
              console.log(
                `Complete: Talk updated --- ${savedTalk.title} (${savedTalk.url})`
              );
              const talkres = await Speaker.updateOne(
                { _id: savedTalk.speaker },
                { $push: { talks: savedTalk._id } }
              );
              const confres = await Conference.updateOne(
                { _id: savedTalk.conference },
                { $push: { talks: savedTalk._id } }
              );
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
      console.log("process complete");
    }
  );
})();
