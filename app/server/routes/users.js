const { Router } = require('express');
const { getAllUser, getUser, createUser, addToBinder, getUserBinder } = require('../db/methods');

const usersRouter = Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUser);
usersRouter.post('/:id/binder', addToBinder);
usersRouter.get('/:id/binder', getUserBinder);

module.exports = {
  usersRouter,
};
