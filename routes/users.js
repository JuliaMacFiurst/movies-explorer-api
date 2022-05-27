const express = require('express');

const usersRouter = express.Router();
const { updateUserValidation } = require('../middlewares/validation');
const { getUserInfo, updateUser } = require('../controllers/users');

usersRouter.get('/me', getUserInfo);

usersRouter.patch('/me', updateUserValidation, updateUser);

module.exports = usersRouter;
