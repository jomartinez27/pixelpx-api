const router = require("express").Router();

const usersController = require("../controllers/users-controller");

router.get("/", usersController.getUsers);

router.get("/:userId", usersController.getUserById);

router.patch("/:userId", usersController.updateUser);

router.delete("/:userId", usersController.deleteUser);

module.exports = router;
