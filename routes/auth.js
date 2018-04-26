const REDIRECTION = {
  successRedirect: "/campgrounds",
  failureRedirect: "/login",
  failureFlash: true
};

var User            = require("../models/user"),
    Comment          = require("../models/comment"),
    Campground        = require("../models/campground"),
    passport        = require("passport");

var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
  res.render("landing");
});

router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", auth("local"), function(req, res){
    req.flash("success", "You have successfully logged in, " + req.user.username);
    res.redirect("/campgrounds");
});

function auth(type){
  return passport.authenticate(type, REDIRECTION);
}

router.get("/register", function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
  var user = new User({username: req.body.username});
  User.register(user, req.body.password, function(err, user){
    if(err){
       req.flash("error", err.message);
       return res.redirect("back");
    }

    passport.authenticate("local")(req, res, function(){
      req.flash("success", "You have successfully registered, " + req.user.username);
      res.redirect("/campgrounds");
    });
  });
});

router.get("/logout", function(req, res){
  req.logout();

  req.flash("success", "You have successfully logged out.");
  res.redirect("/campgrounds");
});

module.exports = router;
