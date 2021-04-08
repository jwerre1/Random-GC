const Talk = require('../models/Talk');
const Speaker = require('../models/Speaker');
const Conference = require('../models/Conference');
const Topic = require('../models/Topic');


exports.getAllTalks = async (req, res, next) => {
  try {
    const talks = await Talk.find().populate('speaker').populate('conference').populate('topics');
    res.json({
      baseURL: 'https://www.churchofjesuschrist.org',
      language: '?lang=eng',
      talks
    });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}