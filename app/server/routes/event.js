const { Router } = require('express');
const {
  createEvent, getAllEvents, getEventbyUser, addDocument,
  getEventDocument, getAllDocument, createPack, saveCards,
  addStudentEvents, getStudentevents,
} = require('../db/methods');

const eventRouter = Router();

eventRouter.post('/', createEvent);
eventRouter.get('/', getAllEvents);
eventRouter.post('/documents', addDocument);
eventRouter.get('/documents', getAllDocument);
eventRouter.get('/:id/documents', getEventDocument);
eventRouter.get('/:id', getEventbyUser);
eventRouter.post('/flashCards', createPack);
eventRouter.post('/cards', saveCards);
eventRouter.get('/:id/student', getStudentevents);
eventRouter.post('/:id/student', addStudentEvents);

module.exports = {
  eventRouter,
};
