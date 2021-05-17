const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conferenceSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  search: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Conference", conferenceSchema);
