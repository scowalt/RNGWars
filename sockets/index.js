module.exports = function onRequire(sessionSockets) {
	var connection = require(__dirname + '/connection')(sessionSockets);
	var register = require(__dirname + '/register')(sessionSockets);

	return {
		connection: connection,
		register: register
	};
}