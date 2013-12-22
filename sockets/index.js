module.exports = function onRequire(sessionSockets){
	var connection = require(__dirname + '/connection')(sessionSockets);

	return {
		connection : connection
	};
}