const Talk = require('../models/Talk');
const Speaker = require('../models/Speaker');
const Conference = require('../models/Conference');
const Topic = require('../models/Topic');


exports.getAllTalks = async (req, res, next) => {
  try {
    //use aggregate().sample() to get 100 random talks
    const talks = await Talk.aggregate([
      { $sample: { size: 100 } },
      { $lookup: { from: 'speakers', localField: 'speaker', foreignField: '_id', as: 'speaker' } }
    ]);//.sample(100);
    //await talks.populate('speaker').populate('conference').populate('topics').execPopulate();
    res.json({
      baseURL: 'https://www.churchofjesuschrist.org',
      language: '?lang=eng',
      talks
    });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}