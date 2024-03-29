var captcha = require('../utils/captcha.js');
var colog = require('colog');
var db = require('../models');

module.exports = function onRequire(sessionSockets, socket) {
	return function onRegister(data) {
		var captchaSolution = captcha.decryptCaptcha(data.captchaSolution);

		if (captchaSolution !== data.captchaAttempt) {
			// wrong captcha, send new image
			socket.emit('incorrect_captcha', {
				captcha: captcha.createCaptcha()
			});
		} else {
			// correct captcha
			var valid = validateAccountInfo(data);
			var duplicate = duplicateUser(data);
			if (valid){
				colog.info("Valid account info, creating account");
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

	function duplicateUser(data){

	}

	function createAccount(data){
		var username = data.username;
		var password = data.password;
		db.User.register(new db.User({username : username, stylized_username : username}), password, function onCreation(err, account){
			if (err){
				colog.error("Error in user registration");
				if (err.message === 'User already exists with name ' + username){
					socket.emit('duplicate_user');
				} else {
					throw err;
				}
				return;
			}
			socket.emit('redirect', '/game');
		})
	}
};