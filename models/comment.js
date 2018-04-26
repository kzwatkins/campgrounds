var mongoose        = require("mongoose");
var User      = require("./user");
var Time = require("./time");

const COMMENT_REF = {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
};


const blueprint = {
      text: String,
      createdAt: Time.TIME_REF,
      author:createAuthor(User.USER_REF, String)
};


var Comment = createModel();
var exports = module.exports = Comment;
exports.addComment = addComment;
exports.addFullComment = addFullComment;
exports.createComment = createComment;
exports.COMMENT_REF = COMMENT_REF;
exports.createAuthor = createAuthor;
exports.createCommentWithUser = createCommentWithUser;
exports.addCommentWithUser = addCommentWithUser;

function addComment(campground, text, author){
  var comment = createComment(text, author);

  console.log("Add a comment to a campground");
  campground.comments.push(comment);
  addCommentToDB(campground, comment);
}

function addFullComment(campground, comment){
  console.log("Add a comment to a campground");
  if(!campground.comments){
    campground.comments = [];
  }

  campground.comments.push(comment);
  addCommentToDB(campground, comment);
}

function createCommentObj(text, author){
  var comment = {
          text: text,
          author: author
        };

        return comment;
}

function createFullCommentObj(id, username, text){
  var comment = {
          text: text,
          author: createAuthor(id, username)
        };

        return comment;
        // return  new Comment(comment);
}

function createAuthor(id, username){
  return {
    id: id,
    username: username
  };
}

function createComment(id, username, text){
  var comment = new Comment(createFullCommentObj(id, username, text));
  return comment;
}

function createCommentWithUser(id, username, text, user){
  var comment = new Comment(createFullCommentObj(id, username, text));
  comment.author = user;
  comment.save();
  return comment;
}

function addCommentWithUser(campground, comment){
  campground.comments.push(comment);
  campground.save();
}

function addCommentToDB(campground, comment){
  comment.save(function(err, comment){
    if(err){
      console.log("Error saving new comment: " + err);
    } else{
      console.log("Comment created successfully: " + comment);
      saveCampground(campground);
    }
  });
}

function createSchema(){
  return new mongoose.Schema(blueprint);
}

function createModel(){
  return mongoose.model("Comment", createSchema());
}

function saveCampground(campground){
  campground.save(function(err, campground){
    if(err){
      console.log("Error saving campground: " + err);
    } else{
      console.log("campground saved successfully: " + campground);
    }
  });
}
