const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Home Page
router.get('/', async (req, res) => {
  const songs = await Song.find();
  const count = await Song.countDocuments();
  res.render('index', { songs, count });
});

// Seed data (first time)
router.get('/seed', async (req, res) => {
  const count = await Song.countDocuments();
  if (count === 0) {
    await Song.insertMany([
      { songname: "Song1", film: "Film1", music_director: "Director1", singer: "Singer1" },
      { songname: "Song2", film: "Film2", music_director: "Director1", singer: "Singer2" },
      { songname: "Song3", film: "Film3", music_director: "Director2", singer: "Singer1" },
      { songname: "Song4", film: "Film4", music_director: "Director3", singer: "Singer3" },
      { songname: "Song5", film: "Film5", music_director: "Director1", singer: "Singer1" }
    ]);
  }
  res.redirect('/');
});

// Add Song
router.post('/add', async (req, res) => {
  await Song.create(req.body);
  res.redirect('/');
});

// Delete Song
router.get('/delete/:songname', async (req, res) => {
  await Song.deleteOne({ songname: req.params.songname });
  res.redirect('/');
});

// Update actor/actress
router.post('/update-cast', async (req, res) => {
  const { songname, actor, actress } = req.body;
  await Song.updateOne({ songname }, { actor, actress });
  res.redirect('/');
});

// Filter by director
router.get('/director/:name', async (req, res) => {
  const songs = await Song.find({ music_director: req.params.name });
  res.render('index', { songs, count: songs.length });
});

// Filter by director and singer
router.get('/director/:dir/singer/:singer', async (req, res) => {
  const songs = await Song.find({ music_director: req.params.dir, singer: req.params.singer });
  res.render('index', { songs, count: songs.length });
});

// Filter by film and singer
// Flexible Filter Route
router.get('/filter', async (req, res) => {
    try {
      const { singer, music_director, film, and } = req.query;
      const count = await Song.countDocuments();
  
      let filter = {};
  
      if (and === 'true') {
        // AND logic: all specified fields must match
        if (singer) filter.singer = singer;
        if (music_director) filter.music_director = music_director;
        if (film) filter.film = film;
      } else {
        // OR logic: any specified field can match
        const orConditions = [];
        if (singer) orConditions.push({ singer });
        if (music_director) orConditions.push({ music_director });
        if (film) orConditions.push({ film });
  
        if (orConditions.length > 0) {
          filter = { $or: orConditions };
        }
      }
  
      const songs = await Song.find(filter);
      res.render('index', { songs, count });
    } catch (err) {
      res.status(500).send('Error filtering songs');
    }
  });
  

module.exports = router;
