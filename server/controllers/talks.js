const Talk = require('../models/Talk');

const baseURL = 'https://www.churchofjesuschrist.org';
const language = '?lang=eng';

const allTalks = async () => {
  //use aggregate().sample() to get 100 random talks
  const talks = await Talk.aggregate([
    { $sample: { size: 100 } },
    { $lookup: { from: 'speakers', localField: 'speaker', foreignField: '_id', as: 'speaker' } },
    { $lookup: { from: 'conferences', localField: 'conference', foreignField: '_id', as: 'conference' } },
    { $lookup: { from: 'topics', localField: 'topics', foreignField: '_id', as: 'topics' } },
  ]);//.sample(100);
  //await talks.populate('speaker').populate('conference').populate('topics').execPopulate();
  return {
    baseURL,
    language,
    talks
  }
}

exports.getAllTalks = async (req, res, next) => {
  try {
    const talks = await allTalks();
    res.json(talks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getSearchTalks = async (req, res, next) => {
  const conferences = req.body.conferences,
    speakers = req.body.speakers,
    topics = req.body.topics;
  if (!conferences.length && !speakers.length && !topics.length) {
    console.log('no search params')
    try {
      const talks = await allTalks();
      res.json(talks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}