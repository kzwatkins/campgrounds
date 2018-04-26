var Comment         = require("../models/comment"),
    Campground      = require("../models/campground"),
    CampgroundFxns  = require("../models/campground-fxns"),
    Middleware      = require("../middleware");
    // AuthFxns        = require("../models/auth-fxns");

var express = require("express");
var router = express.Router();

router.get("/:id/comments/new", Middleware.isLoggedIn, function(req, res){
  var id = req.params.id;
  console.log(req.params);
  var campground = req.body.campground;

  Campground.findById({_id: id}, function(err, campground){
    if(err){
      console.log("GET Error trying to find campground going to new comments: " + err);
    }
    else{
      res.render("comments/new", {campground: campground, currentUser: req.user});
    }
  });
});

router.post("/:id/comments", Middleware.isLoggedIn, function(req, res){
  var id = req.user._id;
  var campgroundId = req.params.id;
  var comment = Comment.createComment(id, req.user.username,
    req.body.comment.text);

  console.log("In posting new comment: " + comment);

  Campground.findById({_id: campgroundId}, function(err, campground){
    if(err){
      console.log("POST Error trying to find campground going to new comments: " + err);
    }
    else{
      console.log("Campground in showing new comments: " + campground);

      Comment.addFullComment(campground, comment);
      res.redirect("/campgrounds/" + campgroundId);
    }
  });
});

router.get("/:id/comments/:commentid/edit", Middleware.isCommentOwner, function(req, res){
  var campgroundId = req.params.id;
  var commentId = req.params.commentid;

  Comment.findById(commentId, function(err, comment){
    if(err){
      console.error("Error, trying to find comment: " + err);
      return res.redirect("/campgrounds/"+campgroundId);
    }

    res.render("comments/edit", {comment: comment, campgroundId: campgroundId});
  })
});

router.put("/:id/comments/:commentid", Middleware.isCommentOwner, function(req, res){
  var commentId = req.params.commentid;
  var comment = req.body.comment;
  var campgroundId = req.params.id;

  // console.log(req.params);

  Comment.findByIdAndUpdate(commentId, comment, function(err, comment){
    if(err){
      console.error("Error in attempting to update comment: " + err);
    }

    console.log("Comment updated: " + comment);
    res.redirect("/campgrounds/"+campgroundId);
  });
});

router.delete("/:id/comments/:commentid", Middleware.isCommentOwner, function(req, res){
  var commentid = req.params.commentid;

  Comment.findByIdAndRemove(commentid, function(err){
    if(err){
      console.error("Error destroying comment: " + err);
      return res.redirect("back");
    }

    console.log("Comment was successfully destroyed.");
    res.redirect("back");
  });
});



module.exports = router;
