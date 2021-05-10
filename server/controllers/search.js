const Conference = require("../models/Conference");
const Speaker = require("../models/Speaker");
const Topic = require("../models/Topic");

exports.getSearchParams = async (req, res, next) => {
  try {
    const conferences = await Conference.find();
    const speakers = await Speaker.find();
    const topics = await Topic.find();

    res.json({
      conferences,
      speakers,
      topics,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
