CREATE DATABASE todo_db;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);


-- DROP TABLE IF EXISTS todo;



-- CREATE TABLE todo(
--     todo_id SERIAL PRIMARY KEY,
--     description VARCHAR(255),
--     isdone BOOLEAN DEFAULT FALSE
-- );


-- SELECT * FROM todo WHERE isDone = false;

SELECT * FROM todo;
