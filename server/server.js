
var express = require('express');
var bodyparser = require('body-parser');
var handler = require('./responseHandler.js');
var path = require('path');
var browserify = require('browserify-middleware');
var cors = require('cors');
var session = require('express-session');

var app = express();

app.use(express.static('static'));

app.use(cors());
app.use(bodyparser.json());


app.use('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/style.css'))
});

app.get('/bundle.js', browserify('./client/index.js', {
  transform: [ [ require('babelify'), { presets: [ 'es2015', 'react' ] } ] ]
}));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/', 'index.html'));
});

app.get('/allusers', handler.findAllUsers);
app.post('/user/create', handler.createUser);
app.post('/user/find', handler.findUser);
app.post('/user/update', handler.updateUser);
var port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Open on port: ',port);
});

