/* Test file for various aspects of the scraping process. */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Talk = require("../models/Talk");
const Topic = require("../models/Topic");

const dbTools = require("./tools/db");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");

const topicsURL =
  "https://www.churchofjesuschrist.org/study/general-conference/topics?lang=eng";
const baseURL = "https://www.churchofjesuschrist.org";
const language = "?lang=eng";

(() => {
  mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async () => {
      console.log("connected to db");
      const response = await dbTools.findTalkTopic(
        "606bf1cff0917e3bb06f2639",
        "606c0164eef7a0483cca3a9f"
      );
      console.log(response);

      console.log("process complete");
    }
  );
})();
