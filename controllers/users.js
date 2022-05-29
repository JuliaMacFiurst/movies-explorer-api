const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET, SALT_ROUNDS } = require('../utils/constants');

const User = require('../models/user');
const BAD_REQUEST = require('../errors/BadRequest');
const NOT_FOUND = require('../errors/NotFound');
const CONFLICT = require('../errors/Conflict');
const NOT_AUTH = require('../errors/AuthError');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, password: hash });

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BAD_REQUEST(err.message));
    } else if (err.code === 11000) {
      next(new CONFLICT('Такой пользователь уже существует.'));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new NOT_AUTH('Переданы некорректные данные при авторизации пользователя.');
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new NOT_AUTH('Переданы некорректные данные при авторизации пользователя.');
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'strongest-key-ever',
      { expiresIn: '7d' },
    );

    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      sameSite: false,
      httpOnly: true,
    });

    res.send({ message: 'Авторизация прошла успешно.' });
  } catch (err) {
    next(err);
  }
};

const getUserInfo = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const userInfo = await User.findById(userId)
      .orFail(() => new NOT_FOUND('Пользователь с указанным id не найден.'));

    res.send(userInfo);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  try {
    const updateUserInfo = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(() => new NOT_FOUND('Пользователь с указанным id не найден.'));

    res.send(updateUserInfo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BAD_REQUEST(err.message && 'Переданы некорректные данные при обновлении профиля.'));
    } else if (err.code === 11000) {
      next(new CONFLICT('Такой пользователь уже существует.'));
    } else {
      next(err);
    }
  }
};

const logout = async (req, res, next) => {
  try {
    await res.clearCookie('jwt', {
      httpOnly: true,
    });

    res.send({ message: 'Выход из системы прошёл успешно.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUser,
  logout,
};
