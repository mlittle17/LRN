const { Router } = require('express');
const { createTopic } = require('../db/methods');

const topicRouter = Router();

topicRouter.post('/', createTopic);

module.exports = {
  topicRouter,
};
