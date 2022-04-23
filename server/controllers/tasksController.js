const {selectAllTask, selectTaskById, insertTask, updateSingleTask, deleteSingleTask} = require('../database/db');

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await selectAllTask("todo");
        res.json(allTasks);
    }catch (error) {
        res.json(error);  
    }
}

const getTaskByid = async (req, res) => {
    try {
      const {id} = req.params;
      const tasks = await selectTaskById("todo","todo_id",id);
      res.json(tasks);
    } catch (error) {
      res.json(error);
    }
}

const createTask = async (req, res) => {
    try {
      // get the data from the request body and store it in a variable
      const {description} = req.body;
      // create a new todo and store it im the database using the pool query
      const newTask = await insertTask("todo","description",description);
       res.json(newTask);
    } catch (error) {
      res.json(error);
    }
}

const updateTask = async (req, res) => {
    try {
      // Get the id and description from the request body and store it in a variable
      const {id} = req.params;
      const {description} = req.body;
      // Update the todo in the database using the pool query and the id and description
      await updateSingleTask("todo","description","todo_id",description,id);
      // Send the updated todo back to the client
      res.json("Task was updated");
    } catch (error) {
      res.json(err.message);
    }
}

const deleteTask = async (req, res) => {
    try {
      // Get the id from the request body and store it in a variable
      const {id} = req.params;
      // Delete the todo from the database using the pool query and the id
      const deleteTodo = await deleteSingleTask("todo","todo_id",id);
      // Send a message back to the client
      res.json("Task was deleted");
    } catch (error) {
      console.error(err.message);
    }
  }


module.exports = {
    getAllTasks,
    getTaskByid,
    createTask,
    updateTask,
    deleteTask
}