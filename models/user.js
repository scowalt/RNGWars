var mongoose = require('mongoose');

// passport-local-mongoose will add username and password
module.exports = new mongoose.Schema({
	email: {
		type: String,
		index: true
	},
	// this field keeps the capitalization choices of the user
	stylized_username: {
		type: String,
		index: false
	}
});