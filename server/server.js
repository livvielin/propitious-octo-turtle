var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');

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

var formatDate = function (date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  var day = date.getDay();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var formattedDate = days[day] + ' ' + mm + '/' + dd + '/' + yyyy;
  return formattedDate;
};

var getCurrentDate = function () {
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  var day = date.getDay();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var formattedDate = days[day] + ' ' + mm + '/' + dd + '/' + yyyy;
  return formattedDate;
};

var findNextAirDate = function (dates) {
  var date = new Date();
  var nextAirDate = 'TBD';
  for (var i = 0; i < dates.length; i++) {
    var diff = date - dates[i];
    if (diff <= 0) {
      nextAirDate = dates[i];
      break;
    }
  }
  return nextAirDate;
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
  var url = 'http://en.wikipedia.org/wiki/List_of_' + tvUrl + '_episodes';

  // var tvUrl = req.body.searchTerm.split(' ').join('-');
  // var url = 'http://tvairdates.com/show/' + tvUrl;

  // Create new wiki model, fill it, and save it to mongoDB
  var wiki = new Wiki();
  wiki.searchTerm = req.body.searchTerm;
  wiki.airDate = getCurrentDate();
  wiki.url = url;
  wiki.save(function (err, result) {
    if (err) {
      console.error(err);
    }
    res.send(result);
  });

};

var updateWiki = function (req, res) {
  console.log('mongoDBServer updateWiki');

  request(req.body.url, function (err, response, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var json = { airDate: '' };

      // Wikipedia
      var dates = [];
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      $('table tr.vevent').each(function(trIndex, tr) {
        var tdText = $(this).find('td .bday').text();
        if (tdText) {
          var date = new Date(tdText);
          // dates.push(date);
          dates.push(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
        }
      });
      var airDate = findNextAirDate(dates);
      if (typeof airDate === 'string') {
        json.airDate = airDate;
      } else {
        json.airDate = formatDate(airDate);
      }

      // TVAirDates
      // var secondsUntilShow = $('.next-date').text(); // time left in seconds
      // var timeObject = new Date();
      // var airDate = new Date(timeObject.getTime() + (parseInt(secondsUntilShow) * 1000));
      // if (secondsUntilShow) {
      //   json.airDate = formatDate(airDate);
      // } else {
      //   json.airDate = 'TBA';
      // }

      Wiki.update({ _id: req.params.id }, json, function (err) {
        res.send(json);
      });
    }
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

// Create route for PUT request
app.put('/wiki/:id', updateWiki);

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
