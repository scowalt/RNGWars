// LIBRARY IMPORTS
var express = require('express');
var util = require('util');

// MODULE IMPORTS
var prefs = require(__dirname + '/config/prefs.js');
var secrets = require(__dirname + '/config/secrets');

var app = express();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.listen(prefs.port);