const mongoose = require('mongoose');
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
  ]);
  return {
    baseURL,
    language,
    talks
  }
}

const emptySlide = [{
  conference: [],
  speaker: [{
    name: "Please Update Search Selections",
    search: "Please Update Search Selections"
  }],
  title: "Talks Not Found",
  topics: [],
  url: ""
}];

exports.getAllTalks = async (req, res, next) => {
  try {
    const talks = await allTalks();
    res.json(talks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getSearchTalks = async (req, res, next) => {
  //console.log(req.body);
  const conferences = req.body.conferences,
    speakers = req.body.speakers,
    topics = req.body.topics;
  let searchArray = [];
  //if no search params passed in...
  if (!conferences.length && !speakers.length && !topics.length) {
    console.log('no search params')
    try {
      const talks = await allTalks();
      res.json(talks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    return;
  }
  if (conferences.length) {
    searchArray = [...searchArray, {
      $match: {
        $or: [...conferences.map(x => { return { 'conference': mongoose.Types.ObjectId(x._id) } })]
      }
    }]
  }
  if (speakers.length) {
    searchArray = [...searchArray, {
      $match: {
        $or: [...speakers.map(x => { return { 'speaker': mongoose.Types.ObjectId(x._id) } })]
      }
    }]
  }
  if (topics.length) {
    searchArray = [...searchArray, {
      $match: {
        $or: [...topics.map(x => { return { 'topics': mongoose.Types.ObjectId(x._id) } })]
      }
    }]
  }
  try {
    const talks = await Talk.aggregate([...searchArray,
    { $lookup: { from: 'speakers', localField: 'speaker', foreignField: '_id', as: 'speaker' } },
    { $lookup: { from: 'conferences', localField: 'conference', foreignField: '_id', as: 'conference' } },
    { $lookup: { from: 'topics', localField: 'topics', foreignField: '_id', as: 'topics' } },
    ]);
    if (talks.length === 0) {
      res.json({
        baseURL,
        language,
        talks: emptySlide
      })
    } else {
      res.json({
        baseURL,
        language,
        talks
      })
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}