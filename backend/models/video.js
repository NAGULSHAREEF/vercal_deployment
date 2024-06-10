// models/video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  video1: String,
  video2: String,
  mixedVideo: String,
});

module.exports = mongoose.model('Video', videoSchema);
