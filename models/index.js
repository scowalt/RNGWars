var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var secrets = require('../prefs/secrets');

var User = require(__dirname + '/user');
User.plugin(passportLocalMongoose);

mongoose.connect('monngodb://localhost/rngwars');

module.exports = {
	User: mongoose.model('User', User);
}