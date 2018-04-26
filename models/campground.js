var Comment = require("./comment");
var User = require("./user");
var mongoose = require("mongoose");
var Time = require("./time");

const blueprint = {
  name: String,
  url: String,
  desc: String,
  price: String,
  author: Comment.createAuthor(User.USER_REF, String),
  createdAt: Time.TIME_REF,
  comments: [Comment.COMMENT_REF]
};

// var schema = createSchema();
var Campground = createModel();

module.exports = Campground;

function createModel(){
  return mongoose.model("Campground", createSchema());
}

function createSchema(){
  return new mongoose.Schema(blueprint);
}
