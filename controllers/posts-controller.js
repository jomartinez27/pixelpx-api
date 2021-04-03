let DUMMY_POSTS = [
    {
        id: "p1",
        title: "First Post"
    },
    {
        id: "p2",
        title: "Second Post"
    }
]

const getPosts = (req, res, next) => {
    res.status(200).json({ posts: DUMMY_POSTS});
}

const getPostById = (req, res, next) => {
    const { postId } = req.params;

    const post = DUMMY_POSTS.find(p => p.id === postId);

    res.status(200).json({ post });
}

const updatePost = (req, res, next) => {
    const { postId } = req.params;

    const updatedPost = DUMMY_POSTS.find((p, index) => p.id === postId);

    const { title } = req.body;
    updatePost[0].title = title;

    res.status(201).json({ post: updatedPost[0] });
}

const deletePost = (req, res, next) => {
    const { postId } = req.params;

    const deletePost = DUMMY_POSTS.find((p, index) => {
        p.id === postId
    });

    res.status(200).json({ message: "Deleted post" });
}


exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.updatePost = updatePost;
exports.deletePost = deletePost;