var colog = require('colog');

module.exports = function onConnection(sessionSockets, socket) {
	colog.info("Received socket connection");

	var register = require(__dirname + '/register')(sessionSockets, socket);

	socket.on('register', register);
}