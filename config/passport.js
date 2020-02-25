const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
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