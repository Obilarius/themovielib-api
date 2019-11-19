const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");


// Handle Signup
router.post("/signup", async (req, res, next) => {
  const {
    username,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({
      msg: "Please enter all fields"
    });
    res.status(400).send(errors);
    return;
  }

  if (password != password2) {
    errors.push({
      key: "password",
      msg: "Passwords do not match"
    });
  }

  if (password.length < 6) {
    errors.push({
      key: "password",
      msg: "Password must be at least 6 characters"
    });
  }

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
    res.status(409).send(errors);
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
        })
        user
          .save()
          .then(result => {
            res.status(201).send(result)
          })
          .catch(next);
      }
    })
  }
});

router.delete("/:userId", (req, res, next) => {
  User.remove({
      _id: req.params.userId
    })
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      })
    })
    .catch(next)
})

module.exports = router;