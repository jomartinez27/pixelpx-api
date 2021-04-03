const router = require("express").Router();

const postsController = require("../controllers/posts-controller");

router.get("/", postsController.getPosts);

router.get("/:postId", postsController.getPostById);

router.patch("/:postId", postsController.updatePost);

router.delete("/:postId", postsController.deletePost);

module.exports = router;