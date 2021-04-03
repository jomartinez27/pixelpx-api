const router = require("express").Router();

const postsController = require("../controllers/posts-controller");

router.get("/", postsController.getPosts);

module.exports = router;