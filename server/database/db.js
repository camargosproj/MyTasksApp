const pg = require('pg');
const {connetionString} = require("../config/envConfig");

var pool = new pg.Client(connetionString);

// Database connection
pool.connect((err) => {
  if(!err) return console.log('Connected to postgres!');
  return console.error('Could not connect to postgres', err);
});

// Get all tasks from the database
const selectAllTask = async (table) => {
  const tasks = await pool.query(`SELECT * FROM ${table}`);
  return tasks.rows;
};

// Get a single task from the database
const selectTaskById = async (table, column,id) => {
  const task = await pool.query(`SELECT * FROM ${table} WHERE ${column} = $1`, [id]);
  return task.rows[0];
};
// Create a new task in the database
const insertTask = async (table, column, description) => {
  const task = await pool.query(`INSERT INTO ${table} ${column} VALUES ($1) RETURNING *`,[description]);
  return task.rows[0];
  //const task = await pool.query(`INSERT INTO todo (description) VALUES ($1) RETURNING *`,[description]);
}

// Update a task in the database
const updateSingleTask = async (table, column, conditionColumn, description, id) => {
  await pool.query(`UPDATE ${table} SET ${column} = $1 WHERE ${conditionColumn} = $2`, [description, id]);
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