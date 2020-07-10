const { Router } = require('express');
const { createEvent } = require('../db/methods');

const eventRouter = Router();

eventRouter.post('/', createEvent)

module.exports = {
  eventRouter,
};