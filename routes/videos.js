const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res)=> {
const videoData = fs.readFileSync('./data/video.json');
 const videoDataJson = JSON.parse(videoData);
 res.send(videoDataJson);
});

router.get('/:id', (req, res) => {
	const videoData = fs.readFileSync('./data/video.json');
    const videoDataJson = JSON.parse(videoData);
	const {id} = req.params;
	const selectedVideo = videoDataJson.find(
		(videoItem) => videoItem.id === id
	);
res.send(selectedVideo);
});





module.exports = router;

