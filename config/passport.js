const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const passport = require('passport');
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    console.log("in passport.js");
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    console.log(opts);
    passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done){
      console.log("in passport use");
      console.log(jwt_payload);
      User.getUserById(jwt_payload._id, (err, user) => {
        if(err){
          return done(err, false);
        }

        if(user){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }));
    //console.log(test);
  }