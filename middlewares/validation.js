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
      .custom((value, tips) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return tips.message(validationMessages.emailInvalidUrl);
      })
      .messages({
        'any.required': validationMessages.emailRequired,
      }),
    password: Joi.string().required()
      .custom((value, tips) => {
        if (validator.isStrongPassword(value, {
          minLength: 8,
          minSymbols: 0,
          minUppercase: 1,
          minLowercase: 1,
          minNumbers: 1,
        })) {
          return value;
        }
        return tips.message(validationMessages.passwordNotStrong);
      })
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
      .custom((value, tips) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return tips.message(validationMessages.emailInvalidUrl);
      })
      .messages({
        'any.required': validationMessages.emailRequired,
      }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .custom((value, tips) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return tips.message(validationMessages.emailInvalidUrl);
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

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': validationMessages.countryRequired,
      }),
    director: Joi.string().required()
      .messages({
        'any.required': validationMessages.directorRequired,
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': validationMessages.durationRequired,
      }),
    year: Joi.string().required()
      .messages({
        'any.required': validationMessages.yearRequired,
      }),
    description: Joi.string().required()
      .messages({
        'any.required': validationMessages.descriptionRequired,
      }),
    image: Joi.string().required()
      .custom((value, tips) => {
        if (validator.isURL(value)) {
          return value;
        }
        return tips.message(validationMessages.imageInvalidUrl);
      })
      .messages({
        'any.required': validationMessages.imageRequired,
      }),
    trailerLink: Joi.string().required()
      .custom((value, tips) => {
        if (validator.isURL(value)) {
          return value;
        }
        return tips.message(validationMessages.trailerLinkInvalidUrl);
      })
      .messages({
        'any.required': validationMessages.trailerLinkRequired,
      }),
    thumbnail: Joi.string().required()
      .custom((value, tips) => {
        if (validator.isURL(value)) {
          return value;
        }
        return tips.message(validationMessages.thumbnailInvalidUrl);
      })
      .messages({
        'any.required': validationMessages.thumbnailRequired,
      }),
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
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required()
      .custom((value, tips) => {
        if (mongoose.isValidObjectId(value)) {
          return value;
        }
        return tips.message(validationMessages.movieIdInvalid);
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
  deleteMovieValidation,
};
