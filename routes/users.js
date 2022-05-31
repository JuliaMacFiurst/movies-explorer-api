const express = require('express');

const usersRoutes = express.Router();
const { updateUserValidation } = require('../middlewares/validation');
const { getUserInfo, updateUser } = require('../controllers/users');

usersRoutes.get('/me', getUserInfo);

usersRoutes.patch('/me', updateUserValidation, updateUser);

module.exports = usersRoutes;
