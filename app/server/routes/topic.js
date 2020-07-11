const { Router } = require('express');
const { createTopic, getTopic, getTopicByUser } = require('../db/methods');

const topicRouter = Router();

topicRouter.post('/', createTopic);
topicRouter.get('/', getTopic);
topicRouter.get('/:id', getTopicByUser);

module.exports = {
  topicRouter,
};
