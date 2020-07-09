CREATE TABLE user (
  Id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(50) NOT NULL,
  nameFirst VARCHAR(80),
  nameLast VARCHAR(80),
  Email VARCHAR(50) UNIQUE NOT NULL,
  imageUrl VARCHAR(160),
  Zip VARCHAR(160)
);

CREATE TABLE event (
  Id SERIAL PRIMARY KEY NOT NULL,
  topic SERIAL NOT NULL,
  date VARCHAR(50),
  time VARCHAR(50),
  user_id SERIAL NOT NULL,
  classLimit INT NOT NULL
);

CREATE TABLE topic (
  Id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50)
);

CREATE TABLE document (
  Id SERIAL PRIMARY KEY NOT NULL,
  documentType VARCHAR(50),
  linkTo VARCHAR(50)
);

CREATE TABLE binder (
  Id SERIAL PRIMARY KEY NOT NULL,
  user_Id SERIAL NOT NULL,
  document_ID SERIAL NOT NULL
);

CREATE TABLE event_Document (
  Id SERIAL PRIMARY KEY NOT NULL,
  event_ID SERIAL NOT NULL,
  document_ID SERIAL NOT NULL
);

CREATE TABLE FlashCard (
  Id SERIAL PRIMARY KEY NOT NULL,
  question VARCHAR(50),
  answer VARCHAR(50),
  flashCardPack_Id SERIAL NOT NULL
);

CREATE TABLE flashCardPack (
  Id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50),
  User_id SERIAL NOT NULL
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

ALTER TABLE event ADD FOREIGN KEY (user_Id) REFERENCES user (Id);

ALTER TABLE binder ADD FOREIGN KEY (user_Id) REFERENCES user (Id);

ALTER TABLE binder ADD FOREIGN KEY (document_Id) REFERENCES document (Id);

ALTER TABLE event_Document ADD FOREIGN KEY (event_Id) REFERENCES event (Id);

ALTER TABLE event_Document ADD FOREIGN KEY (document_Id) REFERENCES document (Id);

ALTER TABLE flashCardPack ADD FOREIGN KEY (user_Id) REFERENCES user (Id);

ALTER TABLE flashCard ADD FOREIGN KEY (flashCardPack_Id) REFERENCES flashCardPack (Id);

