const { Router } = require('express');
// const { topicRouter } = require('./topic');
const { usersRouter } = require('./users');
const { eventRouter } = require('./event');

const routes = Router();

// routes.use('/topic', topicRouter);
routes.use('/student/users', usersRouter);
routes.use('/users', usersRouter);
routes.use('/student/event', eventRouter);
routes.use('/event', eventRouter);

module.exports = {
  routes,
};
