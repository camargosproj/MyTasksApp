const pg = require('pg');
const {connetionString} = require("./config");

var client = new pg.Client(connetionString);
client.connect(function(err) {
  if(err) {
    return console.error('Could not connect to postgres', err);
  }
    console.log('Connected to postgres!')
});

module.exports = client;