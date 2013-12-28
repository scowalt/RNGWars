var captcha = require('../utils/captcha.js');

module.exports = {
	index: function(req, res) {
		res.render('index', {
			captcha: captcha.createCaptcha()
		});
	},
	game : require(__dirname + '/game')
}