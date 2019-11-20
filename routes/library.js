const express = require("express");
const router = express.Router();
const paginatedResults = require("../middleware/paginatedResults");
const isAuthorized = require("../middleware/auth");
const User = require("../models/user");

// Get Library from User
router.get("/:userid", isAuthorized, (req, res, next) => {
  const userId = req.params.userid;

  User.findById(userId)
    .select("_id library")
    .populate("library.movie")
    .then(user => {
      const response = {
        userId: user._id,
        count: user.library.length,
        movies: user.library.map(movie => {
          return {
            movie: movie.movie,
            medium: movie.medium,
            viewed: movie.viewed,
            createdAt: movie.createdAt
          }
        })
      }
      res.json(response);
      // res.send(user);
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
router.post("/:userid", isAuthorized, (req, res, next) => {
  const userId = req.params.userid;
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