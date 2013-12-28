var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var secrets = require('../prefs/secrets');

var User = require(__dirname + '/user');
User.plugin(passportLocalMongoose);

mongoose.connect('mongodb://' + secrets.mongo.user + ':' + secrets.mongo.pass + '@localhost/RNGWars');

module.exports = {
	User: mongoose.model('User', User)
}