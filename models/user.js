const mongoose = require('mongoose');
const validator = require('validator');

const { validationMessages } = require('../utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Ben Bennet',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: validationMessages.emailInvalidUrl,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        return validator.isStrongPassword(v, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
        });
      },
      message: validationMessages.passwordNotStrong,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
