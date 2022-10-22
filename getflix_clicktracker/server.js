const express = require('express');
const app = express();
const path = require('path');
const db = require('./db/index.js');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/clicks', (req, res) => {
  db.clicks((error, data) => {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(200).send(data)
    }
  })
})

app.get('/clicks/user', (req, res) => {
  db.clicksByUser(req.query.userid, (error, data) => {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(200).send(data)
    }
  })
})

app.get('/clicks/movie', (req, res) => {
  db.clicksByMovie(req.query.movieid, (error, data) => {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/clicks', (req, res) => {
  db.addClick(req.body, (error, data) => {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(201).send(data)
    }
  })
})

app.listen(process.env.PORT || 8080);