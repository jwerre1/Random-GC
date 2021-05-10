/** Test program to populate referenced talks
 *
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Talk = require("../models/Talk");
const Speaker = require("../models/Speaker");
const Conference = require("../models/Conference");

const speaker = "David A. Bednar";

(() => {
  mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("connected to db");
      Speaker.find({ speaker }, (err, speakers) => {
        if (err) console.log(err);
        const opts = [{ path: "talks" }];
        Speaker.populate(speakers, opts, (error, spkers) => {
          if (error) console.log(error);
          spkers.forEach((spker) => console.log(spker));
        });
      });
      /*
      Conference.find({}, (err, confs) => {
        const opts = [{ path: 'talks' }];
        const promise = Conference.populate(confs, opts);
        promise.then(console.log);
      });
      */
    }
  );
})();
