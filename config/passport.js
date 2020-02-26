const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");

// Load User Model
const User = require("../models/User")

passport.use(
  new LocalStrategy({
    usernameField: "username",
    passwordField: 'password'
  }, (username, password, done) => {
    // Match User
    User.findOne({
        $or: [{
          email: username
        }, {
          username: username
        }]
      })
      .then(user => {
        if (user == null) {
          return done(null, false, {
            msg: "No user with that username or email"
          });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) console.log(err)

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              msg: "Password incorrect"
            });
          }
        })

      })
      .catch(err => console.log(err))
  })
);


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  function (jwtPayload, cb) {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findById(jwtPayload.userId)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));