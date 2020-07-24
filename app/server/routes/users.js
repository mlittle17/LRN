const { Router } = require('express');
const {
  getAllUser, getUser, createUser, addToBinder, getUserBinder, getSessionCreator,
} = require('../db/methods');

const usersRouter = Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUser);
usersRouter.get('/:id', getSessionCreator);
usersRouter.post('/:id/binder', addToBinder);
usersRouter.get('/:id/binder', getUserBinder);

module.exports = {
  usersRouter,
};
