-- Drop Database If Exists lrn;
-- Create Database lrn;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  googleID VARCHAR(50) UNIQUE NOT NULL,
  username VARCHAR(50) NOT NULL,
  nameFirst VARCHAR(80),
  nameLast VARCHAR(80),
  email VARCHAR(50),
  imageUrl VARCHAR(160),
  zip VARCHAR(160)
);

CREATE TABLE event (
  id SERIAL PRIMARY KEY NOT NULL,
  topic VARCHAR NOT NULL,
  date VARCHAR(50),
  time VARCHAR(20),
  mTime Varchar(20),
  users_id SERIAL NOT NULL,
  classLimit INT NOT NULL,
  privacy Varchar(10)
);

CREATE TABLE topic (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50)
);

CREATE TABLE document (
  id SERIAL PRIMARY KEY NOT NULL,
  documentType VARCHAR(50),
  linkTo VARCHAR(50)
);

CREATE TABLE binder (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id SERIAL NOT NULL,
  document_id SERIAL NOT NULL
);

CREATE TABLE event_Document (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id SERIAL NOT NULL,
  document_id SERIAL NOT NULL
);

CREATE TABLE FlashCard (
  id SERIAL PRIMARY KEY NOT NULL,
  question VARCHAR(50),
  answer VARCHAR(50),
  flashCardPack_id SERIAL NOT NULL
);

CREATE TABLE flashCardPack (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50),
  users_id SERIAL NOT NULL
);

/* to pass in ths schema
First start the postgresql server sudo -u postgres psql
- cd into app and run the command ~  
# create database lrn // have to first create the datbase 
# \c lrn  // this command connects to the database
# \i schema.sql   // this command runs the schema
*/

-- ALTER TABLE user ADD FOREIGN KEY (Id) REFERENCES event ("Instructor");

-- ALTER TABLE document ADD FOREIGN KEY (Id) REFERENCES user (Id);

-- ALTER TABLE "User" ADD FOREIGN KEY ("Id") REFERENCES "Binder" ("User_Id");

-- ALTER TABLE "Document" ADD FOREIGN KEY ("Id") REFERENCES "Event_Documents" ("Document_ID");

ALTER TABLE event ADD FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE binder ADD FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE binder ADD FOREIGN KEY (document_id) REFERENCES document (id);

ALTER TABLE event_Document ADD FOREIGN KEY (event_id) REFERENCES event (id);

ALTER TABLE event_Document ADD FOREIGN KEY (document_id) REFERENCES document (id);

ALTER TABLE flashCardPack ADD FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE flashCard ADD FOREIGN KEY (flashCardPack_id) REFERENCES flashCardPack (id);

