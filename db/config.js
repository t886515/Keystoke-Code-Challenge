
var mongoose = require('mongoose');
global.Promise = require('bluebird');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/userdb', {
  server: {reconnectTries: Number.MAX_VALUE}
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connection open');
});

module.exports = db;