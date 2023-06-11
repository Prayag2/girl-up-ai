const mongoose = require("mongoose");
const { schema } = require("./comment");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    n_likes: {
        type: Number,
        default: 0,
    },
    likes_by: {
        type: [mongoose.Schema.ObjectId],
        ref: "User",
    },
    comments: {
        type: [schema],
        ref: "Comment",
        default: [],
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    authorName: {
        type: String,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
    },
});

module.exports = mongoose.model("Blog", blogSchema);
