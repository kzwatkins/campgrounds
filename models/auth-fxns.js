// const EXPRESS_SESSION_CREDS = {
//   secret: "Are there any secrets left?",
//   resave: false,
//   saveUninitialized: false
// };
//
// var exports = module.exports = init;
// exports.isLoggedIn = isLoggedIn;
//
// var express         = require("express"),
//     mongoose        = require("mongoose"),
//     passport        = require("passport"),
//     LocalStrategy   = require("passport-local"),
//     expressSession  = require("express-session"),
//     ejs             = require("ejs"),
//     bodyParser      = require("body-parser"),
//     Comment         = require("../models/comment"),
//     Campground      = require("../models/campground"),
//     User            = require("../models/user"),
//     app             = express();
//
//
// var app = express();
//
//
// function init(){
//   initSettings();
//   initDB();
//   initPassport();
//   // initRoutes();
// }
//
//
// function initSettings(){
//   app.use(express.static("public"));
//   app.use(bodyParser.urlencoded({extended: true}));
//   app.use(expressSession(EXPRESS_SESSION_CREDS));
//   app.set("view engine", "ejs");
//   app.use(getCurrentUser);
// }
//
// function initPassport(){
//   app.use(passport.initialize());
//   app.use(passport.session());
//   passport.use(new LocalStrategy(User.authenticate()));
//   passport.serializeUser(User.serializeUser());
//   passport.deserializeUser(User.deserializeUser());
//
// }
//
// function initDB(){
//   // Connect to DB
//   mongoose.connect("mongodb://localhost/campgrounds3");
// }
//
// function isLoggedIn(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//
//   res.redirect("/login");
// }
//
// function getCurrentUser(req, res, next){
//   res.locals.currentUser = req.user;
//   next();
// }
