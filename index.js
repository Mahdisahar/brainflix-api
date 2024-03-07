const express = require('express');
const cores = require('cors');
const app = express();

const videos = require('./routes/videos');
require('dotenv').config({path: './.env'});

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static('public'));
app.use(cores());

app.use('/videos', videos);
app.use('/videos/:id', videos);


app.listen(PORT, ()=> {
console.log(`server running on port :${PORT}`);
});