const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

//mongoose
mongoose
  .connect("mongodb+srv://talha:3100477@cluster0-dnv2d.mongodb.net/node-angular?retryWrites=true")
  .then( () => {
    console.log("DB connection is done!");
  }).catch( () => {
    console.log("DB connection is failed!")
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then( postsData => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: postsData
    });
  });
});

app.delete("/api/posts/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
});

module.exports = app;

