const jwt = require('jsonwebtoken');
const NOT_AUTH = require('../errors/AuthError');
const { NODE_ENV, JWT_SECRET } = require('../utils');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'strongest-key-ever');
      console.log(jwt);
    } catch (err) {
      throw new NOT_AUTH('Переданы некорректные данные при авторизации.');
    }
    req.user = payload;
    next();
  } else {
    next(new NOT_AUTH('Необходима авторизация.'));
  }
  return null;
};

module.exports = auth;
