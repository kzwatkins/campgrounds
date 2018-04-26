const EXPRESS_SESSION_CREDS = {
  secret: "Are there any secrets left?",
  resave: false,
  saveUninitialized: false
};

var express         = require("express"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    moment          = require("moment"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    expressSession  = require("express-session"),
    ejs             = require("ejs"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    Comment         = require("./models/comment"),
    Campground      = require("./models/campground"),
    User            = require("./models/user"),
    CampgroundFxns  = require("./models/campground-fxns"),
    // AuthFxns        = require("./models/auth-fxns"),
    seedDB          = require("./seed"),
    app             = express();

var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    authRoutes        = require("./routes/auth");

init();

function initRoutes(){
  app.use(authRoutes);
  app.use("/campgrounds", campgroundRoutes);
  app.use("/campgrounds", commentRoutes);
}

function init(){
  initSettings();
  initDB();
  // seedDB();
  initPassport();
  app.use(getCurrentUser);
  initRoutes();
}

function initSettings(){
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(expressSession(EXPRESS_SESSION_CREDS));
  app.use(methodOverride("_method"));
  app.use(flash());
  app.set("view engine", "ejs");
}

function initPassport(){
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

}

function initDB(){
  // Connect to DB
  mongoose.connect(process.env.DB_YELP || "mongodb://localhost/campgrounds3");
}

function getCurrentUser(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  app.locals.moment = moment;

  next();
}

app.get("*", function(req, res){
  res.send("Sorry there was a problem with your request!");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Yelp Camp Server v12 Started.");
});
