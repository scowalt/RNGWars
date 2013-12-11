// LIBRARY IMPORTS
var express = require('express');
var util = require('util');
var force = require('express-force-domain')

// MODULE IMPORTS
var prefs = require(__dirname + '/prefs/prefs.js');
var secrets = require(__dirname + '/prefs/secrets');
var routes = require(__dirname + '/routes');

var app = express();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  if (prefs.logging.express) app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(force(prefs.serverUrl));
  app.use(app.router);
});

app.listen(prefs.port);

app.get('/', routes.index);