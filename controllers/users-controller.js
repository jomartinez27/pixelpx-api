let DUMMY_USERS = [
  {
    id: "u1",
    name: "test",
  },
  {
    id: "u2",
    name: "user",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ posts: DUMMY_USERS });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  const user = DUMMY_USERS.find((u) => u.id === userId);

  res.status(200).json({ user });
};

const updateUser = (req, res, next) => {
  const { userId } = req.params;

  const updatedUser = DUMMY_USERS.find((u, index) => u.id === userId);

  const { name } = req.body;
  updateUser.name = name;

  res.status(201).json({ post: updatedUser });
};

const deleteUser = (req, res, next) => {
  const { userId } = req.params;

  const deletedUser = DUMMY_USERS.find((p, index) => {
    p.id === userId;
  });

  res.status(200).json({ message: "Deleted user" });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
