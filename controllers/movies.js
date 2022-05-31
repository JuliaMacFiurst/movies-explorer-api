const Movie = require('../models/movie');
const BAD_REQUEST = require('../errors/BadRequest');
const NOT_FOUND = require('../errors/NotFound');
const FORBIDDEN = require('../errors/Forbidden');

const { moviesErrorMessages, noticeMessages } = require('../utils/constants');

const getMovies = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const myMovies = await Movie.find({ owner: userId });
    res.send(myMovies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner,
    });

    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BAD_REQUEST(err.message));
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId)
      .orFail(() => new NOT_FOUND(moviesErrorMessages.noSuchMovieId));

    if (movie.owner.toString() !== userId) {
      throw new FORBIDDEN(moviesErrorMessages.notAllowedToDelete);
    }

    await movie.remove();

    res.send({ message: noticeMessages.successDeleted });
  } catch (err) {
    next(err);
  }

  return null;
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
