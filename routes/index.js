var captchagen = require('captchagen');
var crypto = require('crypto');
var prefs = require('../prefs/prefs');
var secrets = require('../prefs/secrets');

module.exports = {
	index: function(req, res) {
		// create captcha for registration
		var captcha = captchagen.create();
		captcha.generate();

		// encrypt captcha solution
		var cipher = crypto.createCipher(prefs.encryptionAlgorithm, secrets.secret);
		var cryptedCaptchaText = cipher.update(captcha.text(), 'utf8', 'hex');
		cryptedCaptchaText += cipher.final('hex');

		// render page
		res.render('index', {
			captcha: {
				image: captcha.uri(),
				solution: cryptedCaptchaText
			}
		});
	}
}