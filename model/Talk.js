const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const talkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  speaker: { type: Schema.Types.ObjectId, ref: 'Speaker' },
  conference: { type: Schema.Types.ObjectId, ref: 'Conference' },
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
});

module.exports = mongoose.model('Talk', talkSchema);