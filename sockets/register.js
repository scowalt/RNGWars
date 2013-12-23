var colog = require('colog');
var crypto = require('crypto');
var prefs = require('../prefs/prefs');
var secrets = require('../prefs/secrets');

module.exports = function onRequire(sessionSockets, socket){
	return function onRegister(data){
		var captchaSolution = decryptCaptcha(data.captchaSolution);
	};

	function decryptCaptcha(crypted){
		var decipher = crypto.createDecipher(prefs.encryptionAlgorithm, secrets.secret);
		var dec = decipher.update(crypted, 'hex', 'utf8');
		dec += decipher.final('utf8');
		return dec;
	};
};