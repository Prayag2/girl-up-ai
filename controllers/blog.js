const { consola } = require('consola');
const Blog = require('../models/blog');
const User = require('../models/user');

exports.addNewBlog = async (req, res) => {
	try {
		const { title, authorId, text } = req.body;

		if (!(title && authorId && text))
			return res.status(400).send({ err: 'All inputs are required.' });

		const user = await User.findById(authorId);

		const blog = await Blog.create({
			text: text,
			title: title,
			author: authorId,
			authorName: `${user.first_name} ${user.last_name}`,
		});

		return res.status(201).send({ msg: blog });
	} catch (err) {
		consola.error(err);
	}
};

exports.commentOnBlog = async (req, res) => {
	try {
		const { id } = req.params;
		const { text, authorId } = req.body;

		let blog = await Blog.findOne({ _id: id });
		let author = await User.findOne({ _id: authorId });

		if (!blog) return res.status(404).send({ err: "Blog doesn't exist." });

		Blog.updateOne(
			{ id: id },
			{
				$push: {
					comments: {
						text,
						author,
					},
				},
			},
		);

		await blog.save();

		return res.status(200).send({ msg: blog.comment });
	} catch (err) {
		consola.error(err.message);
	}
};

exports.likeBlogPost = async (req, res) => {
	try {
		const { id } = req.params;
		const { u_id } = req.body;

		let user = await User.findById(u_id);
		let blog = await Blog.findOne({ _id: id });

		if (!blog) return res.status(404).send({ err: "Blog doesn't exist." });
		if (!user)
			return res
				.status(404)
				.send({ err: "User doesn't exist, can't like" });

		// await blog.updateOne({
		// 	$inc: { n_likes: 1 },
		// 	$addToSet: { likes_by: u_id },
		// });

		for (v of blog.likes_by.values()) {
			console.log(v);
			if (u_id == v.toString()) {
				return res.status(400).send({ msg: 'Already liked' });
			} else {
				return res.status(200).send({ msg: blog.comment });
			}
		}
	} catch (err) {
		consola.error(err.message);
	}
};

exports.getAllBlogs = async (req, res) => {
	try {
		let blogs = await Blog.find({});

		return res.status(200).send({ blogs });
	} catch (err) {
		consola.error(err.message);
	}
};

exports.getBlog = async (req, res) => {
	try {
		let { id } = req.params;
		let blogs = await Blog.findById(id);

		return res.status(200).send({ blogs });
	} catch (err) {
		consola.error(err.message);
	}
};