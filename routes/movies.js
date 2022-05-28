const express = require('express');

const movieRoutes = express.Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

movieRoutes.get('/', getMovies);

movieRoutes.post('/', createMovieValidation, createMovie);

movieRoutes.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = movieRoutes;
