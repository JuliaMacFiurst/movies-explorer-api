const validationMessages = {
  nameRequired: 'Поле "name" должно быть заполнено.',
  nameMinLength: 'Поле "name" должно содержать минимум 2 символа.',
  nameMaxLength: 'Поле "name" должно содержать максимум 30 символов.',
  emailRequired: 'Поле "email" должно быть заполнено.',
  emailInvalidUrl: 'Поле "email" должно быть валидным адресом.',
  passwordRequired: 'Поле "password" должно быть заполнено.',
  passwordNotStrong: 'Пароль должен содержать минимум 8 символов, символы нижнего и верхнего регистра, цифры.',
  movieIdRequired: 'Поле "movieId" должно быть заполнено.',
  movieIdInvalid: 'Поле "movieId" должно быть валидным id.',
  nameRuRequired: 'Поле "nameRu" должно быть заполнено.',
  nameEnRequired: 'Поле "nameEn" должно быть заполнено.',
  descriptionRequired: 'Поле "description" должно быть заполнено.',
  durationRequired: 'Поле "duration" должно быть заполнено.',
  yearRequired: 'Поле "year" должно быть заполнено.',
  countryRequired: 'Поле "country" должно быть заполнено.',
  directorRequired: 'Поле "director" должно быть заполнено.',
  imageRequired: 'Поле "image" должно быть заполнено.',
  imageInvalidUrl: 'Поле "image" должно быть валидным адресом.',
  trailerLinkRequired: 'Поле "trailerLink" должно быть заполнено.',
  trailerLinkInvalidUrl: 'Поле "trailerLink" должно быть валидным адресом.',
  thumbnailRequired: 'Поле "thumbnail" должно быть заполнено.',
  thumbnailInvalidUrl: 'Поле "thumbnail" должно быть валидным адресом.',
};

const usersErrorMessages = {
  userAlreadyExists: 'Такой пользователь уже существует.',
  invalidAuthData: 'Переданы некорректные данные при авторизации пользователя.',
  userNotFoundById: 'Пользователь с указанным id не найден.',
  invalidUpdatingData: 'Переданы некорректные данные при обновлении профиля.',
  authRequired: 'Необходима авторизация.',
};

const moviesErrorMessages = {
  noSuchMovieId: 'Фильма с таким id нет в базе.',
  notAllowedToDelete: 'У вас нет прав для удаления фильма.',
};

const routesErrorMessages = {
  pageNotFound: 'Запрашиваемая страница не найдена.',
};

const noticeMessages = {
  successLogin: 'Авторизация прошла успешно.',
  successLogout: 'Выход из системы прошёл успешно.',
  successDeleted: 'Фильм удален из базы.',
};

const allowedCors = [
  'https://movies-explorer.nomoredomains.sbs',
  'https://api.movies-explorer.nomoreparties.sbs',
  'http://localhost:3000',
  'localhost:3000',
];

const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  validationMessages,
  usersErrorMessages,
  moviesErrorMessages,
  routesErrorMessages,
  noticeMessages,
  allowedCors,
  allowedMethods,
};
