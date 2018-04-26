var Campground      = require("../models/campground");
var Comment            = require("../models/comment");
var CampgroundFxns  = require("../models/campground-fxns");
var Middleware      = require("../middleware");

var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
  var campgrounds = CampgroundFxns.getCampgrounds(req, res);
});

router.post("/", Middleware.isLoggedIn, function(req, res){
  var campground = CampgroundFxns.createCompleteCampground(req.body.campground);
  campground.author = Comment.createAuthor(req.user._id, req.user.username);
  campground.save();

  res.redirect("/campgrounds");
});

router.get("/new", Middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new", {currentUser: req.user});
}); // show the form for sending data to new post route.

router.get("/search", function(req, res){
  res.render("campgrounds/search");
});

router.get("/results", Middleware.isLoggedIn, function(req, res){
  var name = req.query.name;
  // console.log("Name of campground to find: " + name);
  var campground = CampgroundFxns.findCampground(name);
  res.render("campgrounds/results", {campground: campground});
})

router.get("/remove", Middleware.isCampgroundOwner, function(req, res){
  res.render("campgrounds/remove");
});

router.post("/remove", Middleware.isCampgroundOwner, function(req, res){
  console.log("Remove a campground");

  var name = req.body.name;
  console.log("Name of campground to remove: " + name);

  CampgroundFxns.removeCampground(findCampground(name));

  res.redirect("/campgrounds");
});

router.get("/:id", Middleware.isLoggedIn, function(req, res){
  console.log(req.params);
  CampgroundFxns.findCampgroundByID(req.params.id, req, res);
});

// EDIT
router.get("/:id/edit", Middleware.isCampgroundOwner, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.error("Error trying to find campground when trying to edit: " + err);
      return res.redirect("back");
    }

    res.render("campgrounds/edit", {campground: campground});
  });
});

// UPDATE
router.put("/:id", Middleware.isCampgroundOwner, function(req, res){
  var id = req.params.id;
  var campground = req.body.campground;

  Campground.findByIdAndUpdate(id, campground, function(err, foundCampground){
    if(err){
      console.error("Error in updating campground: " + err);
      return res.redirect("/campgrounds/"+id);
    }

    // console.log("campground updated successfully: " + foundCampground);
    res.redirect("/campgrounds/"+id);
  });
});

router.delete("/:id", Middleware.isCampgroundOwner, function(req, res){
  // Delete all comments from comment
  var id = req.params.id;

  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.error("Error in finding campground: " + err);
      return res.redirect("/campgrounds");
    }

    // var comments = campground.comments;
    // var commentIds = [];
    //
    // comments.forEach(function(comment){
    //   var curCommentId = comment._id.toString();
    //   console.log("Comment id: " + curCommentId);
    //   commentIds.push(curCommentId);
    // });
    //
    // commentIds.forEach(function(commentId){
      // Comment.remove({_id:commentId}, function(err){
      //   if(err){
      //     console.error("Error attempting to delete comment: " + err);
      //     return res.redirect("/campgrounds");
      //   }
      //
      //   console.log("comment " + commentId + " deleted successfully");
      // });
    // });

    Campground.remove({_id:id}, function(err){
      if(err){
        console.error("Error attempting to delete campground: " + err);
        return res.redirect("/campgrounds");
      }

      // console.log("campground " + id + " deleted successfully");
    });

    res.redirect("/campgrounds");
  });
});


module.exports = router;
