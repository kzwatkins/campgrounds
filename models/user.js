const mongoose              = require ("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");
var Time                    = require("./time");

const USER_BLUEPRINT = {
  username: String,
  password: String,
  createdBy: Time.TIME_REF
};

const USER_REF = {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
};


function createUser(username, password){
  var user = {
    username: username,
    password: password
  }

  return new User(user);
}

var UserSchema = new mongoose.Schema(USER_BLUEPRINT);
UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
var exports = module.exports = User;
exports.USER_REF = USER_REF;
exports.createUser = createUser;
