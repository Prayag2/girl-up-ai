const mongoose = require('mongoose');

const commentShema = new mongoose.Schema({
	post_time: {
		type: Date,
		default: Date.now(),
	},
	text: {
		type: String,
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
});

module.exports = {
	model: mongoose.model('Comment', commentShema),
	schema: commentShema,
};
