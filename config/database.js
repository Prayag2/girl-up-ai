const mongoose = require('mongoose');
const { consola } = require('consola');
const { MONGO_URI } = process.env;

exports.connect = () => {
	mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true,
			useunifiedTopology: true,
		})
		.then(() => {
			consola.success('MongoDB connected');
		})
		.catch((error) => {
			consola.error('MongoDB connection failed!');
			consola.error(error.message);
		});
};
