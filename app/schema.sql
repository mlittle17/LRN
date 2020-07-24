CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  googleID VARCHAR(50) UNIQUE NOT NULL,
  username VARCHAR(50) NOT NULL,
  nameFirst VARCHAR(20),
  nameLast VARCHAR(20),
  email VARCHAR(50),
  imageUrl VARCHAR(200),
  zip VARCHAR(10)
);

CREATE TABLE event (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100),
  topic VARCHAR NOT NULL,
  description VARCHAR(250),
  duration Integer,
  date VARCHAR(50),
  time VARCHAR(20),
  mTime Varchar(20),
  users_id Integer NOT NULL,
  classLimit INT NOT NULL,
  capacityCount Integer,
  privacy Varchar(10),
  zip Varchar(10),
  uuid Varchar(50)
);

CREATE TABLE student_event (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id Integer NOT NULL,
  event_id Integer NOT NULL
);

CREATE TABLE topic (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50)
);

CREATE TABLE users_topic (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id Integer NOT NULL,
  topic_id Integer NOT NULL
);

CREATE TABLE document (
  id SERIAL PRIMARY KEY NOT NULL,
  documentType VARCHAR(50),
  name VARCHAR(50),
  linkTo VARCHAR(200),
  users_id Integer NOT NULL,
  event_id Integer NOT NULL
);

CREATE TABLE binder (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id Integer NOT NULL,
  document_id Integer,
  flashCardPack_id Integer
);

CREATE TABLE FlashCard (
  id SERIAL PRIMARY KEY NOT NULL,
  question VARCHAR(100),
  answer VARCHAR(100),
  flashCardPack_id Integer NOT NULL
);

CREATE TABLE flashCardPack (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50),
  users_id Integer NOT NULL,
  event_id Integer
);

/* to pass in ths schema
First start the postgresql server sudo -u postgres psql
- cd into app and run the command ~  
# create database lrn // have to first create the datbase 
# \c lrn  // this command connects to the database
# \i schema.sql   // this command runs the schema
*/


ALTER TABLE event ADD FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE student_event ADD FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE student_event ADD FOREIGN KEY (event_id) REFERENCES event (id);

ALTER TABLE users_topic ADD FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE users_topic ADD FOREIGN KEY (topic_id) REFERENCES topic (id);

ALTER TABLE binder ADD FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE binder ADD FOREIGN KEY (document_id) REFERENCES document (id);

ALTER TABLE binder ADD FOREIGN KEY (flashCardPack_id) REFERENCES flashCardPack (id);

ALTER TABLE document ADD FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE document ADD FOREIGN KEY (event_id) REFERENCES event (id);

ALTER TABLE flashCardPack ADD FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE flashCardPack ADD FOREIGN KEY (event_id) REFERENCES event (id);

ALTER TABLE flashCard ADD FOREIGN KEY (flashCardPack_id) REFERENCES flashCardPack (id);


