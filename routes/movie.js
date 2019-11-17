const express = require("express");
const router = express.Router();
const paginatedResults = require("../middleware/paginatedResults");
const Movie = require("../models/movie");

// get a list of movie from the db
router.get("/", paginatedResults(Movie), (req, res, next) => {
  //   LibraryMovie.find()
  //     .then(movie => {
  //       res.status(200).send(movie);
  //     })
  //     .catch(next);
  res.json(res.paginatedResults);
});

// get a movie by id
router.get("/:tmdb_id", (req, res, next) => {
  Movie.findOne({ tmdb_id: request.params.tmdb_id })
    .then(movie => {
      res.status(200).send(movie);
    })
    .catch(next);
});

// add a new movie to the db
router.post("/", (req, res, next) => {
  Movie.create(req.body)
    .then(movie => {
      res.status(200).send(movie);
    })
    .catch(next);
});

// update a movie in the db
router.put("/:id", (req, res, next) => {
  LibraryMovie.findByIdAndUpdate(
    {
      _id: req.params.id
    },
    req.body
  )
    .then(movie => {
      Movie.findById(req.params.id).then(movie => {
        res.status(200).send(movie);
      });
    })
    .catch(next);
});

// delete a movie in the db
router.delete("/:id", (req, res, next) => {
  Movie.findByIdAndRemove({
    _id: req.params.id
  })
    .then(movie => {
      res.status(200).send(movie);
    })
    .catch(next);
});

module.exports = router;
