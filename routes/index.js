var captcha = require('../utils/captcha.js');

module.exports = function onRequire(passport) {
	return {
		index: function(req, res) {
			res.render('index', {
				captcha: captcha.createCaptcha()
			});
		},
		game: require(__dirname + '/game'),
		login: require(__dirname + '/login')(passport),
		logout: require(__dirname + '/logout')
	};
}