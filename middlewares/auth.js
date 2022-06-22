const jwt = require('jsonwebtoken');
const NOT_AUTH = require('../errors/AuthError');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const { usersErrorMessages } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.rawHeaders.find(el => el.match(/^Bearer */)).replace(/^Bearer /, '');
  if (token) {
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'strongest-key-ever');
    } catch (err) {
      next(new NOT_AUTH(usersErrorMessages.invalidAuthData));
    }
    req.user = payload;
    next();
  } else {
    next(new NOT_AUTH(usersErrorMessages.authRequired));
  }
  return null;
};

module.exports = auth;
