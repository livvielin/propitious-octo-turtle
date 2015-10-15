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
  airDate: String,
  url: String
});

// Use schema to register mongooose model with mongoDB
mongoose.model('Wiki', WikiSchema);
var Wiki = mongoose.model('Wiki');

var app = express();
// Serve up client files
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

// Function called in update (so it'll update on re-render) and post requests (initial)
var searchWiki = function (url) {
  // Submit request for html page based on url
  // Search DOM
  

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var currentDate = mm + '/' + dd + '/' + yyyy;
  return currentDate;
  // return '10/28/2015';
};

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

  // Put MediaWiki API call here
  var tvUrl = req.body.searchTerm.split(' ').join('_');
  var url = 'https://en.wikipedia.org/w/index.php?action=render&title=List_of_' + tvUrl + '_episodes';

  console.log(searchWiki(url));

  // Create new wiki model, fill it, and save it to mongoDB
  var wiki = new Wiki();
  wiki.searchTerm = req.body.searchTerm;
  wiki.airDate = searchWiki();
  wiki.url = url;
  wiki.save(function (err, result) {
    if (err) {
      console.error(err);
    }
    res.send(result);
  });

};

var deleteWiki = function (req, res) {
  console.log('mongoDBServer deleteWiki');

  Wiki.remove({ _id: req.params.id }, function (err) {
    res.send({ _id: req.params.id });
  });
};

// Create route for GET request
app.get('/wiki', getWiki);

// Create route for POST request
app.post('/wiki', postWiki);

// Create route for DELETE request
app.delete('/wiki/:id', deleteWiki);

// Set up port
var port = 3000;
// Have app listen on port specified above
app.listen(port);
console.log('Listening on port ' + port);

// https://en.wikipedia.org/wiki/List_of_The_Big_Bang_Theory_episodes
// https://en.wikipedia.org/w/index.php?action=render&title=The_Big_Bang_Theory
// https://en.wikipedia.org/w/index.php?action=render&title=The_Big_Bang_Theory_(TV%20series)
// https://en.wikipedia.org/w/index.php?action=render&title=List_of_The_Big_Bang_Theory_episodes
// https://en.wikipedia.org/wiki/List_of_The_100_episodes
// https://en.wikipedia.org/w/index.php?action=render&title=The_100_(TV%20series)
// https://en.wikipedia.org/w/index.php?action=render&title=List_of_The_100_episodes
// Get DOM elements
// Search tr class vevent for td that has a date
// Get air date column index by finding th with content 'Original air/release date'

// Or perform the wikipedia search for tv show input plus (tv series)
// then navigate to the episodes page by searching DOM for link 'list of episodes'
