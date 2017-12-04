
var express = require('express');
var bodyparser = require('body-parser');
var handler = require('./responseHandler.js');
var path = require('path');
var browserify = require('browserify-middleware');
var cors = require('cors');
var session = require('express-session');
var passport = require('./passport.js');


var app = express();

app.use(express.static('static'));

app.use(cors());
app.use(bodyparser.json());

app.use(session({
  secret: 'meow',
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/style.css'))
});

app.get('/bundle.js', browserify('./client/index.js', {
  transform: [ [ require('babelify'), { presets: [ 'es2015', 'react' ] } ] ]
}));

app.get('/auth/google',
  passport.authenticate('google', {accessType: 'offline', scope: ['https://www.googleapis.com/auth/plus.login']})
);

app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/', 'index.html'));
});

app.get('/session', handler.checkSession);
app.get('/allusers', handler.findAllUsers);
app.post('/user/create', handler.createUser);
app.post('/user/find', handler.findUser);
app.post('/user/update', handler.updateUser);
app.get('/logout', handler.logout)

var port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Open on port: ',port);
});

