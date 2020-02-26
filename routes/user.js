const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")

const User = require("../models/User");
const bcrypt = require("bcrypt");

// Handle Login with Passport Local Startegy
router.post("/login", (req, res, next) => {
  passport.authenticate('local', {
    session: false
  }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, {
      session: false
    }, (err) => {
      if (err) {
        res.send(err);
      }

      console.log(user)

      const jwt_payload = {
        userId: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        avatar: user.avatar
      }
      // generate a signed jon web token with the contents of user object and return it in the response
      const token = jwt.sign(
        jwt_payload,
        process.env.JWT_SECRET, {
          expiresIn: "1h"
        });
      return res.json({
        token
      });
    });
  })(req, res);
})

// Handle Registration
router.post("/register", async (req, res, next) => {
  const {
    username,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  // Check required fields
  if (!username || !email || !password || !password2) {
    errors.push({
      msg: "Please enter all fields"
    });
    res.status(400).send(errors);
    return;
  }

  // Check passwords match
  if (password != password2) {
    errors.push({
      key: "password",
      msg: "Passwords do not match"
    });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({
      key: "password",
      msg: "Password must be at least 6 characters"
    });
  }

  // Check if email already registered
  await User.findOne({
    email: email
  }).then(user => {
    if (user) {
      errors.push({
        key: "email",
        msg: "Email is already registered"
      });
    }
  });

  // Check if username already registered
  await User.findOne({
    username: username
  }).then(user => {
    if (user) {
      errors.push({
        key: "username",
        msg: "Username is already registered"
      });
    }
  });


  if (errors.length > 0) {
    res.status(400).send(errors);
  } else {
    // Validation passed
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = new User({
          username: username,
          email: email,
          password: hash
        });
        user
          .save()
          .then(result => {
            res.status(200).send(result);
          })
          .catch(next);
      }
    });
  }
})


// Get all User Infos
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.send(req.user);
});

module.exports = router;