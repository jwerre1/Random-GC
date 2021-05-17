const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  topicname: {
    type: String,
    required: true,
  },
  search: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Topic", topicSchema);
