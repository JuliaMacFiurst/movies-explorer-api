const express = require('express');

const router = express.Router();

const NOT_FOUND = require('../errors/NotFound');
const { createUserValidation, loginValidation } = require('../middlewares/validation');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');

router.post(
  '/signup',
  createUserValidation,
  createUser,
);

router.post(
  '/signin',
  loginValidation,
  login,
);

router.all('*', (req, res, next) => next(new NOT_FOUND('Запрашиваемый ресурс не найден')));

module.exports = router;

// 1. создать миделвару авторизации
// 2. подключить остальные роуты
// 3. разобраться что такое createAccontLimiter
// 4. подключить роуты в app.js
// 5. создать request.http для проверки запросов
