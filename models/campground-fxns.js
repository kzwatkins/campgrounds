var Campground      = require("./campground");

var exports = module.exports = createCampground;
exports.addCampground = addCampground;
exports.getCampgrounds = getCampgrounds;
exports.removeCampground = removeCampground;
exports.findCampground = findCampground;
exports.findCampgroundByID = findCampgroundByID;
exports.createCampground = createCampground;
exports.createCompleteCampground = createCompleteCampground;

function addCampground(campground){
  Campground.create(campground, function(err, campground){
    if(err){
      console.log("Error creating campground: " + err);
    } else{
      console.log("Campground created: " + campground);
    }
  });
}

function createCampground(name, url, desc, price){
  var campground = {
          name: name,
          url: url,
          desc: desc,
          price: price,
          comments: []
        };

  return new Campground(campground);
}

function createCompleteCampground(campground){
  campground.comments = [];
  return new Campground(campground);
}

function getCampgrounds(req, res){
  var campgrounds = Campground.find({}, function(err, campgrounds){
    var results = null;

    if(err){
      console.log("Error occurred finding all campgrounds: " + err);
      req.flash("error", err.message);
      res.render("campgrounds/index", {campgrounds: null, name: null, url: null, desc: null});

    } else{
      res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user, name: null, url: null, desc: null});
    }
  });
}

function removeCampground(campground){
  Campground.remove(campground, function(err, campground){
    if(err){
      console.log("Error in attempting to remove campground.");
      return null;
    } else{
      console.log("Campground removed: " + campground);
      return campground;
    }
  });
}

function findCampground(name){
  Campground.find({name: name}, function(err, campground){
    if(err){
      console.log("An error occurred trying to find a campground.");
      return null;
    } else{
      console.log("Campground found! " + campground);
      return campground;
    }
  });
}

function findCampgroundByID(id, req, res){
  Campground.findById(id).populate("comments").exec(function(err, campground){
    if(err){
      console.log("Error finding campground by ID");
      res.redirect("/campgrounds");
    } else{
      res.render("campgrounds/show", {campground: campground, currentUser: req.user, userId: (req.user? req.user._id:null)});
    }
  });
}
