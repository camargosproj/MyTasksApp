const express = require('express');
const {getBordedTask} = require('../controllers/externalApiContoller');

const externalApiRouter = express.Router();


// Get data from external API Boared API
externalApiRouter.get('/surpriseme', getBordedTask);

module.exports = {
    externalApiRouter
}