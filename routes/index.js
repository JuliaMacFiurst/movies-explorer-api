const express = require('express');

const router = express.Router();
const NOT_FOUND = require('../errors/NotFound');

const { routesErrorMessages } = require('../utils/constants');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const movieRoutes = require('./movies');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');

router.post('/signup', createUserValidation, createUser);

router.post(
  '/signin',
  loginValidation,
  login,
);

router.use(auth);

router.post('/signout', logout);
router.use('/users', usersRoutes);
router.use('/movies', movieRoutes);

router.all('*', (req, res, next) => next(new NOT_FOUND(routesErrorMessages.pageNotFound)));

module.exports = router;
