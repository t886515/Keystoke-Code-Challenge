var mongoose = require('mongoose');
// var findOrCreate = require('mongoose-findorcreate');

var userSchema = mongoose.Schema({
  username: String,
  name: String,
  description: String,
  profilePicture: String
});

//add static findOrCreate method to all User models
// userSchema.plugin(findOrCreate);

var User = mongoose.model('User', userSchema);

module.exports = User;