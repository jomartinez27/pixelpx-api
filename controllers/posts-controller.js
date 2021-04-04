const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const { update } = require("../models/post");
const Post = require("../models/post");

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
  const { title, description, image } = req.body;

  const newPost = new Post({
    title,
    description,
    image,
  });

  try {
    await newPost.save();
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
      return next(new HttpError("Error fetching post, please try again later", 500));
  }

  if (!updatedPost) {
      return next(new HttpError("Post not found, please double check post ID", 401));
  }

  const { title, description } = req.body;
  updatedPost.title = title;
  updatedPost.description = description;

  try {
      await updatedPost.save();
  } catch (error) {
      return next(new HttpError("Could not update post, please try again later", 500));
  }

  res.status(201).json({ post: updatedPost.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;

  let deletedPost;
  try {
      deletedPost = await Post.findById(postId);
  } catch (error) {
      return next(new HttpError("Error fetching post, please try again later", 500));
  }

  if (!deletedPost) {
      return next(new HttpError("Post found found, please double check post ID", 401));
  }

  try {
      deletedPost.remove();
  } catch (error) {
      return next(new HttpError("Could not delete post, please try again later", 500));
  }

  res.status(200).json({ message: "Deleted post" });
};

exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
