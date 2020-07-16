const { Router } = require('express');
const { createEvent, getAllEvents, getEventbyUser, addDocument, getEventDocument } = require('../db/methods');

const eventRouter = Router();

eventRouter.post('/', createEvent, addDocument);
eventRouter.get('/', getAllEvents);
eventRouter.post('/documents', addDocument);
eventRouter.get('/:id/documents', getEventDocument);
eventRouter.get('/:id', getEventbyUser);

module.exports = {
  eventRouter,
};
