const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");

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

app.use("/api/posts", postsRoutes);
app.use("/api/user", usersRoutes);

module.exports = app;

