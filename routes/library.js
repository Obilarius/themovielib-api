const express = require("express");
const router = express.Router();
const paginatedResults = require("../middleware/paginatedResults");
const User = require("../models/user");

// get a list of movie from the db
// router.get("/", paginatedResults(LibraryMovie), (req, res, next) => {
//   //   LibraryMovie.find()
//   //     .then(movie => {
//   //       res.status(200).send(movie);
//   //     })
//   //     .catch(next);
//   res.json(res.paginatedResults);
// });

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

// update a movie in the db
// router.put("/:id", (req, res, next) => {
//   LibraryMovie.findByIdAndUpdate(
//     {
//       _id: req.params.id
//     },
//     req.body
//   )
//     .then(movie => {
//       Movie.findById(req.params.id).then(movie => {
//         res.status(200).send(movie);
//       });
//     })
//     .catch(next);
// });

// // delete a movie in the db
// router.delete("/:id", (req, res, next) => {
//   LibraryMovie.findByIdAndRemove({
//     _id: req.params.id
//   })
//     .then(movie => {
//       res.status(200).send(movie);
//     })
//     .catch(next);
// });

module.exports = router;
