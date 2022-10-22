/*
in order to run this .sql file in cli,
  1. first create bocgetflixclicktracker database if not created already
  2. navigate to dir and run the following:
    psql -U me -d bocgetflixclicktracker -a -f pgSchema.sql
  3. to check datatables, connect to the db:
    psql -d bocgetflixclicktracker -U me
    \dt
    \d clicks
    \d users (etc...)
*/

-- CREATE DATABASE bocgetflixclicktracker;
-- psql bocgetflixclicktracker;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id int PRIMARY KEY,
  username text
);

DROP TABLE IF EXISTS movies CASCADE;
CREATE TABLE movies (
  id int PRIMARY KEY,
  movietitle text
);

DROP TABLE IF EXISTS clicks CASCADE;
CREATE TABLE clicks (
  id BIGSERIAL PRIMARY KEY,
  userid int,
  timestamp bigint,
  webpage text,
  object text,
  movieid int,
  FOREIGN KEY (userid) REFERENCES users (id),
  FOREIGN KEY (movieid) REFERENCES movies (id)
);

CREATE INDEX user_id_index ON users (id);
CREATE INDEX movie_id_index ON movies (id);
CREATE INDEX clicks_userid_index ON clicks (userid);
CREATE INDEX clicks_movieid_index ON clicks (movieid);