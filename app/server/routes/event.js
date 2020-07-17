const { Router } = require('express');
const { createEvent, getAllEvents, getEventbyUser, addDocument, getEventDocument } = require('../db/methods');

const eventRouter = Router();

eventRouter.post('/', createEvent);
eventRouter.get('/', getAllEvents);
eventRouter.get('/:id', getEventbyUser);
eventRouter.post('/documents', addDocument);
eventRouter.get('/documents', getEventDocument);

module.exports = {
  eventRouter,
};
