const express = require("express");
const router = express.Router();
const paginatedResults = require("../middleware/paginatedResults");
const passport = require("passport");
const User = require("../models/User");
const Movie = require("../models/Movie");

// Get Library from User
router.get("/", paginatedResults(Movie), (req, res, next) => {
  // res.send(req.user.library)
  res.send(res.paginatedResults);
});

// add a new movie to the library
// {
//  "data": {
// 	  "id": "290859",
// 	  "medium" : "DVD",
// 	  "viewed" : true
//  }
// }

router.post("/", passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  const entry = req.body.data;

  User.findByIdAndUpdate(
      userId, {
        $push: {
          library: entry
        }
      }, {
        safe: true,
        new: true
      }
    )
    .then(user => {
      res.status(201).send(user);
    })
    .catch(next);
});

module.exports = router;