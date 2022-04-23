const express = require('express');
const {tasksRouter} = require('./routes/tasksRoutes');
const {doneTasksRouter} = require('./routes/doneTasksRoutes');
const {externalApiRouter} = require('./routes/externalApiRoutes');
const {port} = require('./config/envConfig');
const app = express();
const cors = require('cors');


// Middleware
app.use(cors());
app.use(express.json()); // this is to parse the json data from the request body

app.use('/api', tasksRouter);
app.use('/api', doneTasksRouter);
app.use('/api', externalApiRouter);

// Routes



// Listening to port
app.listen(port, (error) => {
  if (error) console.log("An error occurred while trying to listen to port " + port);
  console.log(`Server running on port ${port}`);
});