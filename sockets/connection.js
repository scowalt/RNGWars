var colog = require('colog');

module.exports = function onRequire(sessionSockets){
	return function onConnect(socket){
		colog.info("Connection made with socket.io");
	};
}