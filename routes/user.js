const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const initializePassport = require("../config/passport-config");
const passport = require("passport");
const User = require("../models/user");

initializePassport(passport, username => {
  return User.find(user => user.username === username);
});

router.get("/", (req, res, next) => {
  // User.find()
  //   .then(users => {
  //     res.status(200).send(users);
  //   })
  //   .catch(next);

  // initializePassport(passport, username => {
  //   return User.find(user => user.username === username);
  // });

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  });
});

// Register a new User
router.post("/", async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  User.create({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email
  })
    .then(user => {
      res.status(200).send(user);
    })
    .catch(next);
});

// router.put("/:id", (req, res, next) => {
//   User.findByIdAndUpdate(
//     {
//       _id: req.params.id
//     },
//     req.body
//   )
//     .then(user => {
//       User.findById(req.params.id).then(user => {
//         res.status(200).send(user);
//       });
//     })
//     .catch(next);
// });

// router.delete("/:id", (req, res, next) => {
//   User.findByIdAndRemove({
//     _id: req.params.id
//   })
//     .then(user => {
//       res.status(200).send(user);
//     })
//     .catch(next);
// });

module.exports = router;
