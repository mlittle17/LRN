const db = require('../db/index')
// a change
// database methods will go here then import into routes
/*
Users
 */

// method for inserting user info
const createUser = async(req, res) => {
  let { user, firstName, lastName, emails, image, zipcode } = req.body;
  try{
     await db.none("INSERT INTO users (username, namefirst, namelast, email, imageurl, zip) VALUES (?, ?, ?, ?, ?, ?)", [user, firstName, lastName, emails, image, zipcode]);
    res.send({message: 'user added'})
  } catch(err){
    console.log('nah bruh', err);
  }
};
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

// method that gets  particular users info

/*
Events
 */
// method that insert into event
// method that get from event

/*
Topic
 */
// method that insert into topic
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
  createUser
}