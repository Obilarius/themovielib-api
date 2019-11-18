const express = require("express");
const router = express.Router();
const paginatedResults = require("../middleware/paginatedResults");
const User = require("../models/user");

// Get Library from User
router.get("/:userid", (req, res, next) => {
  const userId = req.params.userid;

  User.findById(userId, "library")
    .then(user => {
      res.send(user);
    })
    .catch(next);
});

// add a new movie to the library
// {
//  "data": {
// 	  "movieId": "5dd267559c2724d25a151378",
// 	  "medium" : "DVD",
// 	  "viewed" : true
//  }
// }
router.post("/:userid", (req, res, next) => {
  const userId = req.params.userid;
  const entry = req.body.data;

  User.findByIdAndUpdate(
    userId,
    { $push: { library: entry } },
    { safe: true, new: true }
  )
    .then(user => {
      res.send(user);
    })
    .catch(next);
});

module.exports = router;
