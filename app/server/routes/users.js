const { Router } = require('express');
const { getAllUser, getUser, createUser } = require('../db/methods');

const usersRouter = Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUser)

module.exports = {
  usersRouter,
};