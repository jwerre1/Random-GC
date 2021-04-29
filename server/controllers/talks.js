const Talk = require('../models/Talk');

exports.getAllTalks = async (req, res, next) => {
  try {
    //use aggregate().sample() to get 100 random talks
    const talks = await Talk.aggregate([
      { $sample: { size: 100 } },
      { $lookup: { from: 'speakers', localField: 'speaker', foreignField: '_id', as: 'speaker' } },
      { $lookup: { from: 'conferences', localField: 'conference', foreignField: '_id', as: 'conference' } },
      { $lookup: { from: 'topics', localField: 'topics', foreignField: '_id', as: 'topics' } },
    ]);//.sample(100);
    //await talks.populate('speaker').populate('conference').populate('topics').execPopulate();
    res.json({
      baseURL: 'https://www.churchofjesuschrist.org',
      language: '?lang=eng',
      talks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}