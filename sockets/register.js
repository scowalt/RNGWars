var captcha = require('../utils/captcha.js');
var colog = require('colog');

module.exports = function onRequire(sessionSockets, socket) {
	return function onRegister(data) {
		var captchaSolution = captcha.decryptCaptcha(data.captchaSolution);
		colog.info('captchaSolution = ' + captchaSolution);
		colog.info('captchaAttempt = ' + data.captchaAttempt);

		if (captchaSolution !== data.captchaAttempt) {
			// wrong captcha, send new image
			socket.emit('incorrect_captcha', {
				captcha: captcha.createCaptcha()
			});
		} else {
			// correct captcha, register account
		}
	};
};