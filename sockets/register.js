var captcha = require('../utils/captcha.js');
var colog = require('colog');

module.exports = function onRequire(sessionSockets, socket) {
	return function onRegister(data) {
		var captchaSolution = captcha.decryptCaptcha(data.captchaSolution);

		if (captchaSolution !== data.captchaAttempt) {
			// wrong captcha, send new image
			socket.emit('incorrect_captcha', {
				captcha: captcha.createCaptcha()
			});
		} else {
			// correct captcha, register account
			var valid = validateAccountInfo(data);
			if (valid){
				createAccount(data);
			} else {
				colog.error('invalid account info');
			}
		}
	};

	function validateAccountInfo(data){
		var username = data.username;
		var password = data.password;
		if (typeof username !== 'string' ||
			username.length < 3 ||
			username.match(/[A-Za-z0-9]*/)[0] !== username ||
			typeof password !== 'string' ||
			password.length < 4){
			return false;
		}
		return true;
	}
};