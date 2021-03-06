const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const speakerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  search: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Speaker", speakerSchema);
