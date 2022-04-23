const express = require('express');
const {getAllDoneTasks,postDoneTask,deleteDoneTask} = require('../controllers/doneTasksController');

const doneTasksRouter = express.Router();

// Read all done todos
doneTasksRouter.get('/donetasks', getAllDoneTasks);

// Save a done task to the database
doneTasksRouter.post('/donetasks', postDoneTask)

// Delete a todo
doneTasksRouter.delete("/donetasks/:id", deleteDoneTask);

module.exports = {
    doneTasksRouter
}
  