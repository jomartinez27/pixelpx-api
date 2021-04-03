const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config().parsed;

const HttpError = require("./models/http-error");
const postsRouter = require("./routes/posts-routes");
const usersRouter = require("./routes/users-routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find route", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error occured" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.t1eh8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }
  )
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
