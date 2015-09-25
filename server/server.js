var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var mongoURI = 'mongodb://localhost/wiki';
// Connect to mongo database
mongoose.connect(mongoURI);

// Define schemas
var Schema = mongoose.Schema;

var WikiSchema = new Schema({
  searchTerm: String,
  content: String,
  url: String
});

// Use schema to register mongooose model with mongoDB
mongoose.model('Wiki', WikiSchema);
var Wiki = mongoose.model('Wiki');

var app = express();
// Serve up client files
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

// ROUTES

// Set up GET and POST functions
var getWiki = function (req, res) {
  // Set up headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-File-Name, Content-Type, Cache-Control');

  if ('OPTIONS' === req.method) {
    res.send(203, 'OK');
  }

  console.log('mongodbServer getWiki');

  Wiki.find(function (err, data) {
    res.send(data);
  });
};

var postWiki = function (req, res) {
  // Set up headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-File-Name, Content-Type, Cache-Control');

  if ('OPTIONS' === req.method) {
    res.send(203, 'OK');
  }

  console.log('mongoDBServer postWiki');

  // Create new wiki model, fill it, and save it to mongoDB
  var wiki = new Wiki();
  wiki.searchTerm = req.body.searchTerm;
  wiki.content = 'content!';
  wiki.url = 'http://www.wikipedia.org';
  wiki.save(function (err, result) {
    if (err) {
      console.error(err);
    }
    res.send(result);
  });

};

// Create route for GET request
app.get('/wiki', getWiki);

// Create route for POST request
app.post('/wiki', postWiki);

// Set up port
var port = 3000;
// Have app listen on port specified above
app.listen(port);
console.log('Listening on port ' + port);
