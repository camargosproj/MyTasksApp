const pg = require('pg');
const {connetionString} = require("../config/envConfig");

var pool = new pg.Client(connetionString);

// Database connection
pool.connect((err) => {
  if(!err) return console.log('Connected to postgres!');
  return console.error('Could not connect to postgres', err);
});

// Get all tasks from the database
const selectAllTask = async (table,column,value) => {
  const tasks = await pool.query(`SELECT * FROM ${table} WHERE "${column}" = ${value}`);
  return tasks.rows;
};

// Get a single task from the database
const selectTaskById = async (table, column,id) => {
  const task = await pool.query(`SELECT * FROM ${table} WHERE ${column} = $1`, [id]);
  return task.rows[0];
};
// Create a new task in the database
const insertTask = async (table, column, description) => {
  try{  
    const task = await pool.query(`INSERT INTO ${table} (${column}) VALUES ($1) RETURNING *`,[description]);
    return task.rows[0];
  }catch(error){
    res.json(error);
  }
}

// Update a task in the database
const updateSingleTask = async (table, column, conditionColumn, value, id) => {
  try{
    await pool.query(`UPDATE ${table} SET "${column}" = $1 WHERE ${conditionColumn} = $2`, [value, id]);
  }catch(error){
    res.json(error);
  }
}

// Delete a task from the database
const deleteSingleTask = async (table, column, id) => {
  const deletedTask = await pool.query(`DELETE FROM ${table} WHERE ${column} = $1`, [id])
  return deletedTask.rows[0];
}




module.exports = {
  selectAllTask,
  selectTaskById,
  insertTask,
  updateSingleTask,
  deleteSingleTask
}