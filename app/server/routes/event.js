const { Router } = require('express');
const { createEvent, getAllEvents, getEventbyUser } = require('../db/methods');

const eventRouter = Router();

eventRouter.post('/', createEvent);
eventRouter.get('/', getAllEvents);
eventRouter.get('/:id', getEventbyUser);

module.exports = {
  eventRouter,
};
