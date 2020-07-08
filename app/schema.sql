CREATE TABLE "User" (
  "Id" SERIAL PRIMARY KEY NOT NULL,
  "Username" VARCHAR(50) NOT NULL,
  "Name_First" VARCHAR(80),
  "Name_Last" VARCHAR(80),
  "Email" VARCHAR(50) UNIQUE NOT NULL,
  "Image_Url" VARCHAR(160),
  "Zip_Code" VARCHAR(160)
);

CREATE TABLE "Event" (
  "Id" SERIAL PRIMARY KEY NOT NULL,
  "Topic" SERIAL NOT NULL,
  "Date" VARCHAR(50),
  "Time" VARCHAR(50),
  "Instructor" SERIAL NOT NULL,
  "Class Limit" INT NOT NULL
);

CREATE TABLE "Topic" (
  "Id" SERIAL PRIMARY KEY NOT NULL,
  "Name" VARCHAR(50)
);

CREATE TABLE "Document" (
  "Id" SERIAL PRIMARY KEY NOT NULL,
  "Document_Type" VARCHAR(50),
  "Link_To" VARCHAR(50)
);

CREATE TABLE "Binder" (
  "Id" SERIAL PRIMARY KEY NOT NULL,
  "User_Id" SERIAL NOT NULL,
  "Documents_from_Event" SERIAL NOT NULL
);

CREATE TABLE "Event_Documents" (
  "Id" SERIAL PRIMARY KEY NOT NULL,
  "Event_ID" SERIAL NOT NULL,
  "Document_ID" SERIAL NOT NULL
);

CREATE TABLE "Flash Card" (
  "Id" SERIAL PRIMARY KEY NOT NULL,
  "Question" VARCHAR(50),
  "Answer" VARCHAR(50),
  "Pack_Id" SERIAL NOT NULL
);

CREATE TABLE "Flash Card Pack" (
  "Id" SERIAL PRIMARY KEY NOT NULL,
  "Name" VARCHAR(50),
  "Creator" SERIAL NOT NULL
);

/* to pass in ths schema
First start the postgresql server 
- cd into app and run the command ~ sudo -u postgres psql 
# create database lrn // have to first create the datbase 
# \c lrn  // this command connects to the database
# \i schema.sql   // this command runs the schema
*/








-- ALTER TABLE "User" ADD FOREIGN KEY ("Id") REFERENCES "Event" ("Instructor");

-- ALTER TABLE "Document" ADD FOREIGN KEY ("Id") REFERENCES "User" ("Id");

-- ALTER TABLE "User" ADD FOREIGN KEY ("Id") REFERENCES "Binder" ("User_Id");

-- ALTER TABLE "Document" ADD FOREIGN KEY ("Id") REFERENCES "Event_Documents" ("Document_ID");

-- ALTER TABLE "Event" ADD FOREIGN KEY ("Id") REFERENCES "Event_Documents" ("Event_ID");

-- ALTER TABLE "Event_Documents" ADD FOREIGN KEY ("Id") REFERENCES "Binder" ("Documents_from_Event");

-- ALTER TABLE "Flash Card Pack" ADD FOREIGN KEY ("Id") REFERENCES "Flash Card" ("Pack_Id");

-- ALTER TABLE "User" ADD FOREIGN KEY ("Id") REFERENCES "Flash Card Pack" ("Creator");

-- ALTER TABLE "Topic" ADD FOREIGN KEY ("Id") REFERENCES "Event" ("Topic");
