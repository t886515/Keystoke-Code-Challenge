const db = require('../db/config.js');
const User = require('../db/user.js');

exports.checkSession = (req, res) => {
  res.status(200).send(req.session);
}

exports.createUser = (req, res) => {
  console.log(req.body)
  if (!req.body.username) {
    res.status(403).send('No item passed down');
  } else {
    let created = false;
    User.findOne({username: req.body.username})
    .then((user)=>{
      if (user !==null) {
        created = true;
      }
    })
    .then(()=>{
      if (!created) {  
        var newUser = new User({
          username: req.body.username,
          name: req.body.name,
          description: req.body.description,
          profilePicture: req.body.profilePicture
        });

        newUser.save(function(err) {
          if(err) res.status(400).send(err);
          User.findOne({username: req.body.username})
          .then((user)=> {
            req.session.user = user;
            res.status(200).send(user);
          })
        });
      } else {
        res.status(400).send('user already exist')
      }
    })

  }
}

exports.findUser = (req, res) => {
  if (!req.body.username) {
    res.status.send('No item passed down');
  } else {
    User.findOne({username: req.body.username})
    .then( (user) => {
      if (user === null) {
        res.status(400).send('user not found.')
      } else {
        req.session.user = user;
        res.status(200).send(user);
      }
    })
    .catch( (err) => {
      res.status(400).send('error')
    })
  }
}

exports.updateUser = (req, res) => {
  if (!req.body.username) {
    res.status(400).send('No item passed down');
  } else {
    User.findOne({username: req.body.username})
    .then( (user) => {
      user.name = req.body.name;
      user.description = req.body.description;
      user.profilePicture = req.body.profilePicture;
      user.save();
      req.session.user = user;
      res.status(200).send(user);
    })
  }
}

exports.findAllUsers = (req, res) => {
  User.find({})
  .then((users)=>{
    res.status(200).send(users);
  })
  .catch((err)=>{
    console.log(err);
    res.status(400).send(err);
  })
}

exports.logout = (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
}

