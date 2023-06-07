const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		default: null,
	},
	last_name: {
		type: String,
		default: null,
	},
	email: {
		type: String,
		unique: [true, 'Email is already taken.'],
	},
	phone_number: {
		type: Number,
	},
	password: {
		type: String,
	},
	blog_posts: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Blog',
		default: [],
	},
	token: {
		type: String,
	},
	IP: {
		type: [String],
	},
});

module.exports = mongoose.model('User', userSchema);
