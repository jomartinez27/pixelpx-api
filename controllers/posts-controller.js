const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Post = require("../models/post");
const User = require("../models/user");
const { post } = require("../routes/posts-routes");

const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (error) {
    return next(
      new HttpError("Error fetching posts, please try again later", 500)
    );
  }

  if (!posts || posts.length === 0) {
    return next(new HttpError("No Posts found", 404));
  }

  res
    .status(200)
    .json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const getPostById = async (req, res, next) => {
  const { postId } = req.params;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (error) {
    return next(
      new HttpError("Error fetching post, please try again later", 500)
    );
  }

  if (!post) {
    return next(new HttpError("Post not found", 404));
  }

  res.status(200).json({ post: post.toObject({ getters: true }) });
};

const createPost = async (req, res, next) => {
  const { title, description, image, creator } = req.body;

  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(
      new HttpError("Error fetching user, please try again later", 500)
    );
  }

  if (!user) {
    return next(new HttpError("Invalid user", 401));
  }

  const newPost = new Post({
    creator,
    title,
    description,
    image,
    likes: 0,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPost.save({ session });
    user.posts.push(newPost);
    await user.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Error creating post, please try again later", 500)
    );
  }

  res.status(201).json({ post: newPost.toObject({ getters: true }) });
};

const updatePost = async (req, res, next) => {
  const { postId } = req.params;

  let updatedPost;
  try {
    updatedPost = await Post.findById(postId);
  } catch (error) {
    return next(
      new HttpError("Error fetching post, please try again later", 500)
    );
  }

  if (!updatedPost) {
    return next(
      new HttpError("Post not found, please double check post ID", 401)
    );
  }

  const { title, description } = req.body;
  updatedPost.title = title;
  updatedPost.description = description;

  try {
    await updatedPost.save();
  } catch (error) {
    return next(
      new HttpError("Could not update post, please try again later", 500)
    );
  }

  res.status(201).json({ post: updatedPost.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;

  let deletedPost;
  try {
    deletedPost = await Post.findById(postId).populate("creator");
  } catch (error) {
    return next(
      new HttpError("Error fetching post, please try again later", 500)
    );
  }

  if (!deletedPost) {
    return next(
      new HttpError("Post found found, please double check post ID", 401)
    );
  }

  if (deletedPost.creator.id !== req.body.creator) {
    return next(new HttpError("Unathorized user"), 401);
  }

  try {
     const session = await mongoose.startSession();
     session.startTransaction();
     await deletedPost.remove({ session });
     deletedPost.creator.posts.pull(deletedPost);
     await deletedPost.creator.save({ session });
     await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError(error, 500)
    );
  }

  res.status(200).json({ message: "Deleted post" });
};

exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
