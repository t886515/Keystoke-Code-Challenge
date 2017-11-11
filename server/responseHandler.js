var db = require('../db/config.js');
var User = require('../db/user.js');
var Group = require('../db/group.js');
var utils = require('./utils.js');
var refresh = require('passport-oauth2-refresh');

//creates a new Group associated to the current user
exports.createGroup = (req, res) => {
  //takes in a request, which should contain a user, group name,
  //and maybe isContactLast

  //INPUTS
  //req.body = { currentUser: ~, groupName: ~, isContactList: ~}
  if(!req.body.user) {
    //if no user, return error
    res.status(403).send('No user passed down');
  } else {
    //if user, create a group owned by that user's _id
    var newGroup = new Group({
      owner_id: req.body.user._id,
      group_name: req.body.groupName,
      isContactList: false,
    });

    //send 200 on successful save
    newGroup.save(function(err) {
      if(err) res.status(400).send(err);
      res.sendStatus(200);
    });
  }
};

//will findOrCreate a user based on email address
//if that user is created, it is created with isVerified = false
exports.addOrFindUser = (req, res) => {
  //INPUTS
  //req.params.email
  User.findOrCreate( { emailAddress: req.params.email } )
  .then( (user) => {
    res.status(200).send(user.doc);
  } );
};

//gets all of the (non-Contact) groups for a user
exports.getGroups = (req, res) => {
  //inputs
  //req.params.userid
  User.findOne({_id: req.params.userid})
  .then( (user) => {
    return utils.getGroups(user);
  })
  .then( (groups) => {
    res.status(200).send(groups);
  });
};

//gets the Contact List for a user
exports.getContactGroup = (req, res) => {
  //inputs
  //req.params.userid
  User.findOne({_id: req.params.userid})
  .then( (user) => {
    return utils.getContactList(user);
  })
  .then( (groups) => {
    res.status(200).send(groups);
  });
};

//deletes a Group from the database
exports.deleteGroup = (req, res) => {
  //inputs
  //req.body.group
  Group.remove({_id: req.body.group._id})
  .then( () => {
    res.sendStatus(200);
  });
};

//adds a contact(user record) to a Group
exports.addToGroup = (req, res) => {
  //inputs
  //req.body.group
  //req.body.targetUser
  Group.findOne({_id: req.body.group._id})
  .then( (group) => {
    group.contacts.push(req.body.targetUser._id);
    group.save();
  })
  .then( () => {
    res.sendStatus(200);
  })
};

//removes a contact(user record) from a Group
exports.removeFromGroup = (req, res) => {
  //inputs
  //req.body.group
  //req.body.targetUser
  Group.update({_id: req.body.group._id}, { $pullAll: { contacts: [req.body.targetUser._id] } } )
  .then( () => {
    res.sendStatus(200);
  });
};

//pulls a new Access Token for a User and saves the token to the user record, returns that user
exports.reauth = (req, res) => {
  //inputs
  //req.params.userid
  User.findOne({_id: req.params.userid})
  .then( (user) => {
    refresh.requestNewAccessToken('google', user.refreshToken, function(err, accessToken, refreshToken) {
      if(err) return console.log('Error with reauth')
      user.accessToken = accessToken;
      user.save( (err, user) => {
        if(err) return console.log('error saving user');
        res.status(200).send(user);
      }) 
    });
  })
};

//destroys the session and logs the user out
exports.logout = (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
};

