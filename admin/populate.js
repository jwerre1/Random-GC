/** Test program to populate referenced talks 
 * 
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Talk = require('../model/Talk');
const Speaker = require('../model/Speaker');
const Conference = require('../model/Conference');

(() => {
  mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("connected to db");
      Speaker.find({}, (err, speakers) => {
        console.log(speakers);
        if (err) console.log(err);
        const opts = [{ path: 'talks' }];
        Speaker.populate(speakers, opts, (error, spkers) => {
          if (error) console.log(error);
          spkers.forEach(spker => console.log(spker))
        });
      });
      Conference.find({}, (err, confs) => {
        const opts = [{ path: 'talks' }];
        const promise = Conference.populate(confs, opts);
        promise.then(console.log);
      });
    })
})();
