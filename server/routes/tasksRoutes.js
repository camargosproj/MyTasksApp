const express = require('express');
const {getAllTasks, getTaskByid, createTask, updateTask} = require('../controllers/tasksController');

const tasksRouter = express.Router();

// Read all todos
tasksRouter.get('/tasks', getAllTasks);

// Read a single todo
tasksRouter.get("/tasks/:id", getTaskByid);

// Create a todo
tasksRouter.post('/task', createTask);

// Update a todo
tasksRouter.put("/tasks/:id", updateTask);

// Delete a todo
tasksRouter.delete("/tasks/:id", )

module.exports = {
  tasksRouter
}