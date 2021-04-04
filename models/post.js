const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User"},
    title: {type: String, required: true},
    description: String,
    image: {type: String, required: true},
    likes: Number,
    likers: [{ type: mongoose.Types.ObjectId, ref: "User"}],
    date: Date
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;