var mongoose = require('mongoose');

var user = require(__dirname + '/user');

module.exports = {
	User: mongoose.model('User', user);
}