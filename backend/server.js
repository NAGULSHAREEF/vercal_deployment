require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const cors = require('cors');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vidmixer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const videoSchema = new mongoose.Schema({
  video1: String,
  video2: String,
  mixedVideo: String,
});

const Video = mongoose.model('Video', videoSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/mix-videos', upload.fields([{ name: 'video1' }, { name: 'video2' }]), async (req, res) => {
  try {
    const { video1, video2 } = req.files;
    const outputFilePath = `uploads/mixed_${Date.now()}.mp4`;

    ffmpeg()
      .input(video1[0].path)
      .input(video2[0].path)
      .on('error', (err) => {
        console.error('Error processing video:', err);
        res.status(500).json({ error: 'Error processing video' });
      })
      .on('end', async () => {
        const newVideo = new Video({
          video1: video1[0].path,
          video2: video2[0].path,
          mixedVideo: outputFilePath,
        });
        await newVideo.save();
        res.json({ mixedVideoUrl: `http://localhost:5000/${outputFilePath}` });
      })
      .mergeToFile(outputFilePath);
  } catch (err) {
    console.error('Error handling request:', err);
    res.status(500).json({ error: 'Error handling request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
