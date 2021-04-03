const express = require("express");

const postsRouter = require("./routes/posts-routes");

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());

app.use("/api/posts", postsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})