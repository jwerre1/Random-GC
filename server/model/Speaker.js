const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const speakerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  talks: [{ type: Schema.Types.ObjectId, ref: 'Talk' }]
});

module.exports = mongoose.model('Speaker', speakerSchema);