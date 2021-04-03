const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    image: {type: String, required: true},
    likes: Number,
    date: Date
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;