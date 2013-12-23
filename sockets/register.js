var colog = require('colog');

module.exports = function onRequire(sessionSockets){
	return function onRegister(socket){
		colog.info('Received registration attempt');
	};
};