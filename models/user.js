const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, minlength: 3 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "Post "}],
    profileImage: String,
    date: Date,
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

module.exports = User;
