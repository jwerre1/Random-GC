const Talk = require('../../model/Talk');
const Speaker = require('../../model/Speaker');
const Conference = require('../../model/Conference');
const Topic = require('../../model/Topic')

exports.findTalk = async input => {
  const returnValue = await Talk.findOne({ 'url': input }, (err, res) => {
    if (err || !res) return 0;
    return res._id;
  });
  return returnValue
}

exports.findSpeaker = async input => {
  const returnValue = await Speaker.findOne({ 'name': input }, (err, res) => {
    if (err || !res) return 0;
    return res._id;
  });
  return returnValue
}

exports.setSpeaker = async input => {
  const speaker = new Speaker({
    name: input
  });
  try {
    const savedSpeaker = await speaker.save();
    console.log(`speaker ${savedSpeaker.name} saved!`);
    return savedSpeaker._id;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

exports.findConference = async input => {
  const arr = input.split(' ');
  const month = arr[0];
  const year = parseInt(arr[1]);
  const returnValue = await Conference.findOne({ 'month': month, 'year': year }, (err, res) => {
    if (err || !res) return 0;
    return res._id;
  });
  return returnValue
}

exports.setConference = async input => {
  const arr = input.split(' ');
  const month = arr[0];
  const year = parseInt(arr[1]);
  const conference = new Conference({
    year,
    month
  });
  try {
    const savedConference = await conference.save();
    console.log(`conference ${savedConference.month} ${savedConference.year} saved!`);
    return savedConference._id;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

exports.findTopic = async input => {
  const returnValue = await Topic.findOne({ 'topicname': input }, (err, res) => {
    if (err || !res) return 0;
    return res._id;
  });
  return returnValue
}

exports.setTopic = async input => {
  const topic = new Topic({
    topicname: input
  });
  try {
    const savedTopic = await topic.save();
    console.log(`Created - Topic: ${topic.topicname}`);
    return savedTopic._id;
  } catch (error) {
    console.log(error);
    return 0;
  }
}