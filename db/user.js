var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  name: String,
  description: String,
  profilePicture: String
});


var User = mongoose.model('User', userSchema);

module.exports = User;