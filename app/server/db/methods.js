const db = require('../db/index');
// a change
// database methods will go here then import into routes
/*
Users
 */

// method for inserting user info
const createUser = async(req, res) => {
  try{
     await db.query("INSERT INTO users (username, namefirst, namelast, email, imageurl, zip) VALUES ( ${user}, ${firstName}, ${lastName}, ${emails}, ${image}, ${zipcode})", req.body);
    res.send({message: 'user added'})
  } catch(err){
    console.log('nah bruh', err);
  }
};

// method that gets  particular users info
const getUser = async(req, res) => {
  try{
   let user = await db.one(`SELECT * FROM user WHERE id = ${req.params.id}`);
   res.send(user);
  }catch(err){
    console.log(`no user, ${err}`)
  }
}
// method that gets all the users info
const getAllUser = async(req, res) => {
  try{
    let users = await db.any("SELECT * FROM users");
    res.send(users)
  } catch(err){
    console.log(`no users, ${err}`)
  }
}


/*
Events
 */
// method that insert into event
const createEvent = async(req, res) => {
  try{
    // not working yet
     await db.query("INSERT INTO event (topic, date, time, users_id, classLimit) VALUES ( ${topic}, ${date}, ${time}, ${user_Id}, ${classLimit})", req.body);
    res.send({message: 'event added'})
  } catch(err){
    console.log('nah bruh', err);
  }
};
// method that get from event

/*
Topic
 */
// method that insert into topic
const createTopic = async(req,res) => {
  try{
    await db.query("INSERT INTO topic (name) VALUES (${name})", req.body);
    res.send('it worked')
  } catch(err){
    console.log('nah', err);
  }
};
// method that get from topix

/*
Document
 */
// method that insert into Document
// method that get from Document

/*
Binder
 */
// method that insert into Binder
// method that get from Binder

/*
Event_Documents
 */
// method that insert into Event_Documents
// method that get from Event_Documents

/*
Flash_Cards
 */
// method that insert into Flash Cards
// method that get from Flach Cards

/*
Flash card packs
 */
// method that insert into Flash Card Pack
// method that get from Flash Card Pack

module.exports = {
  getAllUser,
  getUser,
  createUser,
  createTopic,
  createEvent,
}