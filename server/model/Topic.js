const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  topicname: {
    type: String,
    required: true,
  },
  talks: [{ type: Schema.Types.ObjectId, ref: 'Talk' }]
});

module.exports = mongoose.model('Topic', topicSchema);