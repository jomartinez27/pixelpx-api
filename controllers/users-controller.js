const mongoose = require("mongoose");

const User = require("../models/user");
const HttpError = require("../models/http-error");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return next(
      new HttpError("Error fetching users, please try again later", 500)
    );
  }

  if (!users) {
    return next(new HttpError("No users found"), 404);
  }

  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(
      new HttpError("Error fetching user, please try again later"),
      500
    );
  }

  if (!user) {
    return next(new HttpError("User not found"), 404);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const createUser = async (req, res, next) => {
    const { username, email, password, image } = req.body;

    const newUser = new User({
        username,
        email,
        password,
        image
    });

    try {
        await newUser.save();
    } catch (error) {
        return next(new HttpError("Error creating user, please try again later", 500));
    }

    res.status(201).json({ user: newUser.toObject({ getters: true })});
}

const updateUser = async (req, res, next) => {
  const { userId } = req.params;

  let updatedUser;
  try {
    updatedUser = await User.findById(userId);
  } catch (error) {
    return next(
      new HttpError("Error fetching user, please try again later"),
      500
    );
  }

  if (!updatedUser) {
    return next(
      new HttpError("User not found, please double check user ID"),
      404
    );
  }

  const { username, email, password } = req.body;
  updatedUser.username = username;
  updatedUser.email = email;
  updatedUser.password = password;

  try {
    updatedUser.save();
  } catch (error) {
    return next(
      new HttpError("Error updating user, please try again later"),
      401
    );
  }

  res.status(201).json({ post: updatedUser.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  let deletedUser;
  try {
      deletedUser = await User.findById(userId);
  } catch (error) {
      return next(new HttpError("Error fetching user, please try again later"), 500);
  }

  if (!deletedUser) {
      return next(new HttpError("User not found, please double check user ID"), 404);
  }

  try {
      await deletedUser.remove();
  } catch (error) {
      return next(new HttpError("Error deleting user, please try again later"), 500);
  }

  res.status(200).json({ message: "Deleted user" });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
