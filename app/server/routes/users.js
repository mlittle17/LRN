const { Router } = require('express');
const {
  getAllUser, getUser, createUser, addToBinder, getUserBinder, getSessionCreator, addUserEvent,
} = require('../db/methods');

const usersRouter = Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUser);
usersRouter.get('/:id', getSessionCreator);
usersRouter.post('/:id/binder', addToBinder);
usersRouter.get('/:id/binder', getUserBinder);
usersRouter.post('/:id/binder', addToBinder);
usersRouter.post('/:id/event', addUserEvent);

module.exports = {
  usersRouter,
};
