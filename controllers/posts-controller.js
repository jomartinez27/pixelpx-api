const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
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

const updatePost = (req, res, next) => {
  const { postId } = req.params;

  const updatedPost = DUMMY_POSTS.find((p, index) => p.id === postId);

  const { title } = req.body;
  updatePost[0].title = title;

  res.status(201).json({ post: updatedPost[0] });
};

const deletePost = (req, res, next) => {
  const { postId } = req.params;

  const deletePost = DUMMY_POSTS.find((p, index) => {
    p.id === postId;
  });

  res.status(200).json({ message: "Deleted post" });
};

exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
