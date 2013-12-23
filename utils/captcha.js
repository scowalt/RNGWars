var captchagen = require('captchagen');
var crypto = require('crypto');
var prefs = require('../prefs/prefs');
var secrets = require('../prefs/secrets');

module.exports = {
	createCaptcha: function createCaptcha() {
		// create captcha for registration
		var captcha = captchagen.create();
		captcha.generate();

		// encrypt captcha solution
		var cipher = crypto.createCipher(prefs.encryptionAlgorithm, secrets.secret);
		var cryptedCaptchaText = cipher.update(captcha.text(), 'utf8', 'hex');
		cryptedCaptchaText += cipher.final('hex');

		return {
			image: captcha.uri(),
			solution: cryptedCaptchaText
		};
	},
	decryptCaptcha: function decryptCaptcha(crypted) {
		var decipher = crypto.createDecipher(prefs.encryptionAlgorithm, secrets.secret);
		var dec = decipher.update(crypted, 'hex', 'utf8');
		dec += decipher.final('utf8');
		return dec;
	}
}