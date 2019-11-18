const express = require("express");
const router = express.Router();
const paginatedResults = require("../middleware/paginatedResults");
const LibraryMovie = require("../models/library_movie");
const Library = require("../models/library")

// get a list of movie from the db
router.get("/", paginatedResults(LibraryMovie), (req, res, next) => {
  //   LibraryMovie.find()
  //     .then(movie => {
  //       res.status(200).send(movie);
  //     })
  //     .catch(next);
  res.json(res.paginatedResults);
});

// add a new movie to the db
router.post("/", (req, res, next) => {
  LibraryMovie.create(req.body)
    .then(movie => {
      res.status(200).send(movie);
    })
    .catch(next);
});


router.get("/library/", (req, res, next) => {
  Library.find()
    .then(libEntrys => {
      res.send(libEntrys);
    })
    .catch(next);
  res.send("bib");
});

router.post("/library/", (req, res, next) => {
  Library.create(req.body)
    .then(libEntry => {
      res.send(libEntry);
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