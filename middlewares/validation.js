const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const mongoose = require('mongoose');

const { validationMessages } = require('../utils');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': validationMessages.nameRequired,
        'string.min': validationMessages.nameMinLength,
        'string.max': validationMessages.nameMaxLength,
      }),
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message(validationMessages.emailInvalidUrl);
      })
      .messages({
        'any.required': validationMessages.emailRequired,
      }),
    password: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
        })) {
          return value;
        }
        return helpers.message(validationMessages.passwordNotStrong);
      })
      .messages({
        'any.required': validationMessages.passwordRequired,
      }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().label('Da')
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message(validationMessages.emailInvalidUrl);
      })
      .messages({
        'string.required': validationMessages.emailRequired,
      }),
    password: Joi.string().required()
      .messages({
        'any.required': validationMessages.passwordRequired,
      }),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': validationMessages.nameRequired,
        'string.min': validationMessages.nameMinLength,
        'string.max': validationMessages.nameMaxLength,
      }),
    email: Joi.string().required().email()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message(validationMessages.emailInvalidUrl);
      })
      .messages({
        'any.required': validationMessages.emailRequired,
      }),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required()
      .messages({
        'any.required': validationMessages.movieIdRequired,
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': validationMessages.nameRuRequired,
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': validationMessages.nameEnRequired,
      }),
    description: Joi.string().required()
      .messages({
        'any.required': validationMessages.descriptionRequired,
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': validationMessages.durationRequired,
      }),
    year: Joi.string().required()
      .messages({
        'any.required': validationMessages.yearRequired,
      }),
    country: Joi.string().required()
      .messages({
        'any.required': validationMessages.countryRequired,
      }),
    director: Joi.string().required()
      .messages({
        'any.required': validationMessages.directorRequired,
      }),
    image: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(validationMessages.imageInvalidUrl);
      })
      .messages({
        'any.required': validationMessages.imageRequired,
      }),
    trailer: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(validationMessages.trailerInvalidUrl);
      })
      .messages({
        'any.required': validationMessages.trailerRequired,
      }),
    thumbnail: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(validationMessages.thumbnailInvalidUrl);
      })
      .messages({
        'any.required': validationMessages.thumbnailRequired,
      }),
  }),
});

const removeMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required()
      .custom((value, helpers) => {
        if (mongoose.isValidObjectId(value)) {
          return value;
        }
        return helpers.message(validationMessages.movieIdInvalid);
      })
      .messages({
        'any.required': validationMessages.movieIdRequired,
      }),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  updateUserValidation,
  createMovieValidation,
  removeMovieValidation,
};