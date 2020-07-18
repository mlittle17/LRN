const { Router } = require('express');
const {
  createEvent, getAllEvents, getEventbyUser, addDocument, getEventDocument, getAllDocument
} = require('../db/methods');

const eventRouter = Router();

eventRouter.post('/', createEvent);
eventRouter.get('/', getAllEvents);
eventRouter.post('/documents', addDocument);
eventRouter.get('/documents', getAllDocument);
eventRouter.get('/:id/documents', getEventDocument);
eventRouter.get('/:id', getEventbyUser);

module.exports = {
  eventRouter,
};
