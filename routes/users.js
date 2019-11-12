const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require("../models/user")
const isAuthorized = require("../middleware/auth")

router.get("/", isAuthorized, (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(next);
});


// Register Handle
router.post("/register", async (req, res, next) => {
  const {
    username,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({
      msg: 'Please enter all fields'
    });
  }

  if (password != password2) {
    errors.push({
      key: "password",
      msg: 'Passwords do not match'
    });
  }

  if (password.length < 6) {
    errors.push({
      key: "password",
      msg: 'Password must be at least 6 characters'
    });
  }

  await User.findOne({
      email: email
    })
    .then(user => {
      if (user) {
        errors.push({
          key: "email",
          msg: 'Email is already registered'
        });
      }
    })

  await User.findOne({
      username: username
    })
    .then(user => {
      if (user) {
        errors.push({
          key: "username",
          msg: 'Username is already registered'
        });
      }
    })


  if (errors.length > 0) {
    res.status(400).send(errors);
  } else {
    // Validation passed
    // Create new User
    const newUser = new User({
      username,
      email,
      password: ""
    })

    // Hash Password
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          errors.push({
            msg: 'Error'
          });
          res.status(400).send(errors);
        }

        // Set password to hashed
        newUser.password = hash
        // Save user
        newUser.save()
          .then(user => {
            res.send(user);
          })
          .catch(next);
      });
    });
  }

})

module.exports = router;