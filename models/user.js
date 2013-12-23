var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String,
		index: false
	},
	email: {
		type: String,
		index: true
	}
});