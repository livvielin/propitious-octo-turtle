var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
// Serve up client files
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

// Set up port
var port = 3000;
// Have app listen on port specified above
app.listen(port);
console.log('Listening on port ' + port);
