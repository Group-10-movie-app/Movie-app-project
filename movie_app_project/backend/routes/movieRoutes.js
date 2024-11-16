const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Route for searching movies
router.get('/search', movieController.searchMovies);

// Route for fetching movie genres
router.get('/genres', movieController.getGenres);

// Route for fetching movie details by ID
router.get('/details/:id', movieController.getMovieDetails);

module.exports = router;
