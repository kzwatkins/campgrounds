var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middleware = {
  isLoggedIn: function (req, res, next){
    if(req.isAuthenticated()){
      next();
    } else{
      req.flash("error", "Please login first");
      res.redirect("/login");
    }
  },

  isCommentOwner: function (req, res, next){
    if(!req.isAuthenticated()){

      req.flash("error", "Sorry, you have to be logged in to do that.");
      return res.redirect("back");
    }

    Comment.findById(req.params.commentid, function(err, comment){
      if(err){

        req.flash("error", "An error occurred trying to find the comment: " + err);
        return res.redirect("back");
      }

      if(comment.author.id.equals(req.user._id)){
        next();
      } else{
        req.flash("error", "You don't own that comment.");
        res.redirect("back");
      }
    });
  },

  isCampgroundOwner: function (req, res, next){
    if(req.isAuthenticated()){
      var id = req.params.id;

      Campground.findById(id, function(err, campground){
        if(err){
          req.flash("error", "An error occurred trying to find the campground.");
          res.redirect("back");
        } else{
          var userId = req.user._id;

          if(campground.author.id.equals(userId)){
            next();
          } else{
            req.flash("error", "You don't own that campground.");
            res.redirect("back");
          }
        }
      });
    } else{
        req.flash("error", "Sorry, you have to be logged in to do that.");
        res.redirect("back");
    }
  }
};

module.exports = middleware;
