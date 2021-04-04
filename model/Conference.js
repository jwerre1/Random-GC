const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conferenceSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  talks: [{ type: Schema.Types.ObjectId, ref: 'Talk' }]
});

module.exports = mongoose.model('Conference', conferenceSchema);