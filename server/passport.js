var passport = require('passport');
var refresh = require('passport-oauth2-refresh');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var googleConfig = require('./passportConfig.js');
var User = require('../db/user');

passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser( (user, done) => {
  done(null, user);
});

var callbackURL = 'http://localhost:8000/auth/google/callback';

var strategy = new GoogleStrategy({
  clientID: googleConfig.GOOGLE_CLIENT_ID,
  clientSecret: googleConfig.GOOGLE_CLIENT_SECRET,
  callbackURL: callbackURL
},
  function(accessToken, refreshToken, profile, done) {
    process.nextTick( () => {
      const auth = {
        token: accessToken,
        profile: profile
      };
      User.findOrCreate({ username: profile.id },
      {
        name: profile.displayName,
        description: "",
        profilePicture: profile.photos[0].value

      })
      .then((user)=>{
        auth.user = user;
        return user;
      })
      .then((user)=>{
        return done(null, auth);
      })
    });//process.nextTick finish bracket
  }
);

passport.use(strategy);
refresh.use(strategy);

module.exports = passport;