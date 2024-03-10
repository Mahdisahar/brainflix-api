const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require("uuid");

// Read video data from JSON file
function readVideoData() {
  const videoData = fs.readFileSync('./data/video.json');
  const videoDataJson = JSON.parse(videoData);
  return videoDataJson;
}

// get videos
router.get('/', (req, res) => {
	// try {} catch(error){res.send(error)}
  const videosData = readVideoData();
  res.status(200).send(videosData);
});

// get single video by id 
router.get('/:id', (req, res) => {
  const videoData = readVideoData();
  const { id } = req.params;
//   const selectedVideo = videoData.find((videoItem) => videoItem.id === id);
//   res.status(200).send(selectedVideo);
const selectedVideo = videoData.find((videoItem) => {
	return videoItem.id === id;
});
if (selectedVideo) {
	res.send(selectedVideo);
} else {
	res.status(400).send("Error find video data with id");
}
});

// POST new video
router.post('/', (req, res) => {
  const videoData = readVideoData();

// Construct the new video object
const newVideo = {
	title: req.body.title ,
	channel:req.body.channel,
	description: req.body.description,
	id:uuid(),
	views: 0,
	likes:0,
	duration: req.body.duration,
	video: req.body.video,
	image: "http://localhost:8085/images/Upload-video-preview.jpg",
	timestamp:Date.now(),
	comments: []
};

  // Add the new video to the list
videoData.push(newVideo);

// JSON.strinfigy the newly updated video 
const writeVideo = JSON.stringify(videoData);
fs.writeFileSync('./data/postvideo.json', writeVideo);

  // write the stringified video to the video.json file
  res.status(200).send(newVideo);
});

module.exports = router;
