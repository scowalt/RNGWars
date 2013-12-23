// LIBRARY IMPORTS
var colog = require('colog');
var express = require('express');
var force = require('express-force-domain');
var IO = require('socket.io');
var RedisStore = require('connect-redis')(express);
var SessionSockets = require('session.socket.io');
var util = require('util');

// MODULE IMPORTS
var prefs = require(__dirname + '/prefs/prefs.js');
var secrets = require(__dirname + '/prefs/secrets');
var routes = require(__dirname + '/routes');

// SETUP
var app = express();
var io = IO.listen(app.listen(prefs.port));
io.set('log level', prefs.logging.socket);
var sessionStore = new RedisStore(secrets.redis);
var cookieParser = express.cookieParser(secrets.secret);
var sessionSockets = new SessionSockets(io, sessionStore, cookieParser);

var sockets = require(__dirname + '/sockets')(sessionSockets);

// configure Express
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	if (prefs.logging.express) app.use(express.logger());
	app.use(cookieParser);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use(express.session({
		store: sessionStore
	}));
	app.use(force(prefs.serverUrl));
	app.use(app.router);
});

// socket routing
io.sockets.on('connection', sockets.connection);

// express (web) routing
app.get('/', routes.index);