var captcha = require('../utils/captcha.js');

module.exports = {
	index: function(req, res) {
		// render page
		res.render('index', {
			captcha: captcha.createCaptcha()
		});
	}
}