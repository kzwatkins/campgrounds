// var mongoose        = require("mongoose"),
//     Campground      = require("./models/campground"),
//     Comment         = require("./models/comment"),
//     User            = require("./models/user"),
//     Generics        = require("./generics"),
//     campgroundFxns  = require("./models/campground-fxns");
//
// var users = [User.createUser("me@email.com", "comliameem"),
//             User.createUser("us@email.com", "mocliamesu"),
//             User.createUser("dem@email.com", "mocliamemed"),
//             User.createUser("you@email.com", "mocliameuoy")];
//
// var data = [ campgroundFxns("Yellow Springs", "techWoman1.jpeg", "A quirky campground northeast of Dayton"),
//               campgroundFxns("John Bryan", "techWoman2.jpeg", "A campground in a large Ohio state park."),
//               campgroundFxns("Latin America", "techWoman5.jpeg", "Do people from Latin America call themselves Americans?"),
//               campgroundFxns("Riverside, OH", "techWoman9.jpeg", "Riverside is its own campground. Set up a tent any time!"),
//               campgroundFxns("Yosemite", "techWoman8.jpeg", "You know I'm confused between Yellowstone and Yosemite. Where are they in relation to one another?"),
//             ];
//
// var commentData = [Comment.createCommentWithUser("Your guess is as good as mine!", users[0]),
//             Comment.createCommentWithUser("Who's the lucky winner?", users[1]),
//             Comment.createCommentWithUser("How can a rock be a pillow?", users[2]),
//             Comment.createCommentWithUser("Do you think that God goes on vacation in the mountains too?", users[2]),
//             Comment.createCommentWithUser("Why do i need a shovel to go to the bathroom", users[0]),
//             Comment.createCommentWithUser("My favorite campground provides room service", users[1]),
//             Comment.createCommentWithUser("How can a rock be a pillow?", users[3]),
//             Comment.createCommentWithUser("Who's the lucky winner?", users[0]),
//             Comment.createCommentWithUser("Can a pillow be a rock?", users[1]),
//             Comment.createCommentWithUser("This was an awesome campground... I think? I haven't actually been yet.", users[2])
//             ];
//
// module.exports = seedDB;
//
// function seedDB(){
//   // remove all campgrounds
//   console.log("Remove all campgrounds, comments and users");
//   removeAllComments();
//
//   // saveUsers();
//   // saveCampgrounds();
// }
//
// function saveUsers(){
//   users.forEach(function(user){
//     user.save();
//   });
// }
//
// function saveCampgrounds(){
//   data.forEach(function(datum){
//     datum.save();
//   });
// }
//
// function seedCampground(campground){
//   Campground.create(campground, function(err, campground){
//     if(err){
//       console.log("Error creating campground: " + err);
//     } else{
//       console.log("Campground created: " + campground);
//       seedComments(campground);
//     }
//   });
// }
//
// function removeAllComments(){
//   Comment.remove({}, function(err){
//     if(err){
//       console.log("Error removing all comments.");
//     } else{
//       console.log("All comments successfully removed.");
//       removeAllCampgrounds();
//     }
//   });
//
// }
//
// function removeAllCampgrounds(){
//   Campground.remove({}, function(err){
//     if(err){
//       console.log("Error removing all campgrounds.");
//     } else{
//       console.log("All campgrounds successfully removed.");
//       removeAllUsers();
//
//       // // add a few campgrounds
//       // console.log("Add some campgrounds");
//       // data.forEach(function(datum){
//       //   seedCampground(datum);
//       // });
//     }
//   });
// }
//
// function removeAllUsers(){
//   User.remove({}, function(err){
//     if(err){
//       console.log("Error removing all users.");
//     } else{
//       console.log("All users successfully removed.");
//
//       data.forEach(function(datum){
//         seedCampground(datum);
//       });
//     }
//   });
// }
//
// function seedUsers(){
//   users.forEach(function(user){
//     var password = user.password;
//     delete user.password;
//
//     User.register(user, password, function(err, newUser){
//       var username = newUser.username;
//
//       if(err){
//         console.log("Error registering user, " + username + " - " + err.message);
//       } else{
//         console.log("User " + username + " successfully registered.");
//       }
//     });
//   });
// }
//
// function seedComments(campground){
//   commentData.forEach(function(comment){
//     var randIndex = Generics.randNum(0, commentData.length);
//     var comment = commentData[randIndex];
//     console.log("Attempting to seed comment: " + comment + " to campground: " + campground);
//     Comment.addCommentWithUser(campground, comment);
//   });
// }
