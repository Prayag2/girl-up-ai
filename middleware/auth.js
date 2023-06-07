const { consola } = require('consola');
const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) return res.status(401).send({ err: 'Unauthorized access.' });

	try {
		const decoded = jwt.verify(token, config.TOKEN_KEY);
		req.user = decoded;
	} catch (err) {
		consola.error(err);
	}
	return next();
};

module.exports = verifyToken;
