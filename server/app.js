const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db'); // this is the connection to the database
const axios = require('axios');

// Port number
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json()); // this is to parse the json data from the request body


// Routes
// Create a todo
app.post('/todos', async (req, res) => {
  try {
    // get the data from the request body and store it in a variable
    const {description} = req.body;
    // create a new todo and store it im the database using the pool query
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",
    [description]);
     res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})
// Create a todo
app.post('/donetodos', async (req, res) => {
  try {
    // get the data from the request body and store it in a variable
    const {description} = req.body;
    // create a new todo and store it im the database using the pool query
    const newTodo = await pool.query("INSERT INTO done_todo (description) VALUES ($1) RETURNING *",
    [description]);
     res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})
// Read all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(err.message);

  }
});
// Read all done todos
app.get('/donetodos', async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM done_todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(err.message);

  }
});

app.get('/try', async (req, res) => {
  try {
    const response = await axios.get('https://www.boredapi.com/api/activity/');
    res.json(response.data);
  } catch (error) {
    console.error(err.message);

  }
});

// Read a single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
})

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    // Get the id and description from the request body and store it in a variable
    const {id} = req.params;
    const {description} = req.body;
    // Update the todo in the database using the pool query and the id and description
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
    // Send the updated todo back to the client
    res.json("Todo was updated");
  } catch (error) {
    console.error(err.message);
  }
})
// Update a status of a task
app.put("/todos/:id", async (req, res) => {
  try {
    // Get the id and description from the request body and store it in a variable
    const {id} = req.params;
    const {isDone} = req.body;
    // Update the todo in the database using the pool query and the id and description
    const updateTodo = await pool.query("UPDATE todo SET done = $1 WHERE todo_id = $2", [isDone, id]);
    // Send the updated todo back to the client
    res.json("Todo was updated");
  } catch (error) {
    console.error(err.message);
  }
})

// Delete a todo
app.delete("/donetodos/:id", async (req, res) => {
  try {
    // Get the id from the request body and store it in a variable
    const {id} = req.params;
    // Delete the todo from the database using the pool query and the id
    const deleteTodo = await pool.query("DELETE FROM done_todo WHERE todo_id = $1", [id]);
    // Send a message back to the client
    res.json("Todo was deleted");
  } catch (error) {
    console.error(err.message);
  }
})
// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    // Get the id from the request body and store it in a variable
    const {id} = req.params;
    // Delete the todo from the database using the pool query and the id
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    // Send a message back to the client
    res.json("Todo was deleted");
  } catch (error) {
    console.error(err.message);
  }
})
// Listening to port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});