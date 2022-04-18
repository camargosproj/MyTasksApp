DROP TABLE todo;
DROP TABLE done_todo;
 
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
 
CREATE TABLE done_todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);


 
 