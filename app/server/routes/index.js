const { Router } = require('express');
const { topicRouter } = require('./topic');
const { usersRouter } = require('./users');
const { eventRouter } = require('./event')


const routes = Router();

routes.use('/topic', topicRouter);
routes.use('/users', usersRouter);
routes.use('/event', eventRouter);


module.exports = {
  routes,
};