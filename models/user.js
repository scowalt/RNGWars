var mongoose = require('mongoose');

// passport-local-mongoose will add username and password
module.exports = new mongoose.Schema({
	email: {
		type: String,
		index: true
	}
});