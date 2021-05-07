const Talk = require('../../models/Talk');
const Speaker = require('../../models/Speaker');
const Conference = require('../../models/Conference');
const Topic = require('../../models/Topic')

exports.findTalk = async input => {
  const returnValue = await Talk.findOne({ 'url': input });
  return returnValue; //return obj in case have to look up values
}

exports.findSpeaker = async input => {
  const returnValue = await Speaker.findOne({ 'name': input });
  return returnValue; //return obj in case have to look up values
}

exports.setSpeaker = async input => {
  const speaker = new Speaker({
    name: input,
    search: input
  });
  try {
    const savedSpeaker = await speaker.save();
    console.log(`speaker ${savedSpeaker.name} saved!`);
    return savedSpeaker;
  } catch (error) {
    console.log(error);
    return null;
  }
}

exports.findConference = async input => {
  const arr = input.split(' ');
  const month = arr[0];
  const year = parseInt(arr[1]);
  const returnValue = await Conference.findOne({ 'month': month, 'year': year });
  return returnValue; //return obj in case have to look up values
}

exports.setConference = async input => {
  const arr = input.split(' ');
  const month = arr[0];
  const year = parseInt(arr[1]);
  const conference = new Conference({
    year,
    month,
    search: input
  });
  try {
    const savedConference = await conference.save();
    console.log(`conference ${savedConference.month} ${savedConference.year} saved!`);
    return savedConference;
  } catch (error) {
    console.log(error);
    return null;
  }
}

exports.findTalkTopic = (talkObj, topicObj) => {
  return (talkObj.topics.indexOf(topicObj._id) > -1);
}

exports.findTopic = async input => {
  const returnValue = await Topic.findOne({ 'topicname': input });
  return returnValue; //return obj in case have to look up values
}

exports.setTopic = async input => {
  const topic = new Topic({
    topicname: input,
    search: input
  });
  try {
    const savedTopic = await topic.save();
    console.log(`Created - Topic: ${topic.topicname}`);
    return savedTopic;
  } catch (error) {
    console.log(error);
    return null;
  }
}