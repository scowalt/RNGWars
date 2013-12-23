var captcha = require('../utils/captcha.js');
var colog = require('colog');
var crypto = require('crypto');
var prefs = require('../prefs/prefs');
var secrets = require('../prefs/secrets');

module.exports = function onRequire(sessionSockets, socket){
	return function onRegister(data){
		var captchaSolution = captcha.decryptCaptcha(data.captchaSolution);
		colog.info('captchaSolution = ' + captchaSolution);
	};

	
};