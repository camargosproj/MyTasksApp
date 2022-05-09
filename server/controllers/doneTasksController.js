const {selectAllTask, updateSingleTask, deleteSingleTask} = require('../database/db');

const getAllDoneTasks = async (req, res) => {
    try {
      const allDoneTasks = await selectAllTask("todo","isdone",true);
      res.json(allDoneTasks);
    } catch (error) {
      res.json(err.message);  
    }
}

const updateDoneTask = async (req, res) => {
    try {
      // get the data from the request body and store it in a variable
      const {id} = req.body;
        // create a new todo and store it im the database using the pool query
        // const newDoneTask = await insertTask("done_todo","description",description);
        const newDoneTask = await updateSingleTask("todo", "isdone", "todo_id", true,id);
        res.json(newDoneTask);
    } catch (error) {
      res.json(error);
    }
}

const deleteDoneTask = async (req, res) => {
    try {
      // Get the id from the request body and store it in a variable
      const {id} = req.params;
      console.log(id);
      // Delete the todo from the database using the pool query and the id
      const deleteTodo = await deleteSingleTask("todo","todo_id",id);
      // Send a message back to the client
      res.json("Task was deleted");
    } catch (error) {
      res.json(error);
    }
};


module.exports = {
    getAllDoneTasks,
    updateDoneTask,
    deleteDoneTask

}