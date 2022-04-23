const express = require('express');
const {getAllDoneTasks,postDoneTask,deleteDoneTask} = require('../controllers/doneTasksController');

const doneTasksRouter = express.Router();

// Read all done todos
doneTasksRouter.get('/donetasks', getAllDoneTasks);

// Save a done task to the database
doneTasksRouter.post('/donetask', postDoneTask)

// Delete a todo
doneTasksRouter.delete("/donetask/:id", deleteDoneTask);

module.exports = {
    doneTasksRouter
}
  