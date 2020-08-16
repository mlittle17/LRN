const db = require('./index');
// a change
// database methods will go here then import into routes
/*
Users
 */

// method for inserting user info
// const createUser = async(req, res) => {
//   const {googleID, user, firstName, lastName, emails, image, zipcode } = req.body;
//   try {
//     await db.query(`INSERT INTO users (googleID, username, namefirst, namelast, email, imageurl, zip) VALUES ('${googleID}', '${user}', '${firstName}', '${lastName}', '${emails}', '${image}', '${zipcode}')`);
//     res.send({ message: 'user added' });
//   } catch (err) {
//     console.log('nah bruh', err);
//   }
// };

const createUser = (user) => {
  // const { username, lastname } = user;
  const {
    googleId, username, firstName, lastName, photo, email,
  } = user;
  db.query(`INSERT INTO users (googleID, username, nameFirst, nameLast, email, imageUrl) VALUES ('${googleId}', '${username}', '${firstName}', '${lastName}', '${email}', '${photo}')`);
};
const getUser = (id) => {
  return db.query(`SELECT * FROM users WHERE googleid = '${id}'`);
};
const getSessionCreator = (id) => {
  return db.query(`SELECT * FROM users WHERE id = '${id}'`);
};

// method that gets all the users info
const getAllUser = async(req, res) => {
  try {
    const users = await db.any('SELECT * FROM users');
    res.send(users);
  } catch (err) {
    console.log(`no users, ${err}`);
  }
};

/*
Events
 */
// location header - url ends with newly created resource id
const createEvent = async(req, res) => {
  try {
    const id = await db.query('INSERT INTO event (name, topic, description, duration, date, time, users_id, classLimit, zip, uuid) VALUES ( ${name}, ${topic}, ${description}, ${duration}, ${date}, ${time}, ${user_id}, ${classLimit}, ${zip}, ${uuid}) RETURNING id', req.body);
    res.send(id);
  } catch (err) {
    console.log('nah bruh', err);
  }
};

const getAllEvents = async(req, res) => {
  try {
    const events = await db.any('SELECT E.*, U.nameFirst, U.nameLast from event E INNER JOIN users U on U.id = E.users_id');
    res.send(events);
  } catch (err) {
    console.log(`no events, ${err}`);
  }
};

// this gets users events
const getEventbyUser = async(req, res) => {
  try {
    const userEvents = await db.any(`SELECT E.*, U.nameFirst, U.nameLast from event E INNER JOIN users U on U.id = E.users_id WHERE E.users_id= ${req.params.id}`);
    res.send(userEvents);
  } catch (err) {
    console.log(`this user is boring, ${err}`);
  }
};

// add user events
const addUserEvent = async(req, res) => {
  const {
    name, topic, description, duration, date, time, user_id, classLimit, zip, uuid,
  } = req.body;
  try {
    await db.query(`INSERT INTO event (name, topic, description, duration, date, time, users_id, classLimit, zip, uuid) VALUES ( '${name}', '${topic}', '${description}', '${duration}', '${date}', '${time}', '${user_id}', '${classLimit}', '${zip}', '${uuid}')`);
    res.send('user added');
  } catch (err) {
    console.log('nah bruh', err);
  }
};

const addStudentEvents = async(req, res) => {
  try {
    await db.query('INSERT INTO student_event (users_id, event_id) VALUES (${users}, ${event})', req.body);
    res.send('it worked');
  } catch (err) {
    console.log('nah', err);
  }
};

const getStudentevents = async(req, res) => {
  try {
    const studentEvents = await db.any(`SELECT S.*, U.nameFirst, U.nameLast, E.name, E.time, E.date from student_event S INNER JOIN event E on E.id = S.event_id INNER JOIN users U on U.id = S.users_id WHERE S.users_id= ${req.params.id}`);
    res.send(studentEvents);
  } catch (err) {
    console.log(`no events, ${err}`);
  }
};

/*
Topic
 */

// const createTopic = async(req, res) => {
//   try {
//     await db.query('INSERT INTO topic (name) VALUES (${name})', req.body);
//     res.send('it worked');
//   } catch (err) {
//     console.log('nah', err);
//   }
// };

// method that get from topic
// const getTopic = async(req, res) => {
//   try {
//     const topic = await db.any(`SELECT * FROM topic WHERE users_id = ${req.param.id} `);
//     res.send(topic);
//   } catch (err) {
//     console.log(`they not ready for this knowledge, ${err}`);
//   }
// };

// get topics a user likes
// const getTopicByUser = async(req, res) => {
//   try {
//     const userTopics = await db.any(`SELECT * FROM topic WHERE user_id = ${req.params.id}`);
//     res.send(userTopics);
//   } catch (err) {
//     console.log(`no user topics, ${err}`);
//   }
// };

/*
Document
*/

const addDocument = async(req, res) => {
  const {
    type, name, link, user_id, event_id,
  } = req.body;
  try {
    const id = await db.query(`INSERT INTO document (documentType, name, linkTo, users_id, event_id) VALUES ('${type}', '${name}','${link}', '${user_id}', '${event_id}') RETURNING id`);
    res.send(id);
  } catch (err) {
    console.log('got documents', err);
  }
};

const getAllDocument = async(req, res) => {
  try {
    const documents = await db.any('SELECT * FROM document');
    res.send(documents);
  } catch (err) {
    console.log('No document', err);
  }
};

const getEventDocument = async(req, res) => {
  try {
    const eventDocuments = await db.any(`SELECT D.*, U.nameFirst, U.nameLast from document D INNER JOIN event E on E.ID = D.event_id INNER JOIN users U ON U.id = E.users_id WHERE E.id = ${req.params.id}`);
    res.send(eventDocuments);
  } catch (err) {
    console.log(`No Docs, ${err}`);
  }
};

/*
Binder
*/

const addToBinder = async(req, res) => {
  try {
    await db.query('INSERT INTO binder (users_id, document_id) VALUES(${users_id}, ${document_id})', req.body);
    res.send('it worked');
  } catch (err) {
    console.log('nah', err);
  }
};
// method that get from topic.
const getUserBinder = async(req, res) => {
  try {
    const userBinder = await db.any(`SELECT B.*, U.nameFirst, U.nameLast, D.linkTo, D.documentType, D.name from binder B INNER JOIN document D on D.id = B.document_id 
    INNER JOIN users U on U.id = D.users_id WHERE D.users_id = ${req.params.id}`);
    res.send(userBinder);
  } catch (err) {
    console.log(`No Binder, ${err}`);
  }
};

/*
Flash_Cards
 */
// method that insert into Flash Cards
// method that get from Flach Cards
const saveCards = async(req, res) => {
  const { cards, packId } = req.body;

  cards.forEach(card => {
    const { front, back } = card;
    db.query(`INSERT INTO flashcard (question, answer, flashCardPack_id) VALUES ('${front}', '${back}', '${packId}')`);
  });
};

/*
Flash card packs
 */
// method that insert into Flash Card Pack
const createPack = async(req, res) => {
  const { packName, user_id, event_id } = req.body;
  try {
    const id = await db.query(`INSERT INTO flashCardPack (name, users_id, event_id) VALUES ( '${packName}', '${user_id}', '${event_id}') RETURNING id`);
    res.send(id);
  } catch (err) {
    console.log('nah bruh', err);
  }
};
// method that get from Flash Card Pack

module.exports = {
  createEvent,
  getAllEvents,
  getAllUser,
  getUser,
  createUser,
  addUserEvent,
  addStudentEvents,
  getStudentevents,
  // createTopic,
  // getTopicByUser,
  getEventbyUser,
  addDocument,
  getAllDocument,
  getSessionCreator,
  addToBinder,
  getUserBinder,
  getEventDocument,
  createPack,
  saveCards,
};
