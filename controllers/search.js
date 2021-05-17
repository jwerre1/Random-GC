const path = require("path");
const Conference = require(path.join(__dirname, "../models/Conference"));
const Speaker = require(path.join(__dirname, "../models/Speaker"));
const Topic = require(path.join(__dirname, "../models/Topic"));

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
