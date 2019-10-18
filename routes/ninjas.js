const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninja")

// get a list of ninjas from the db
router.get("/", (req, res, next) => {
  Ninja.find()
    .then((ninjas) => {
      res.status(200).send(ninjas);
    })
    .catch(next);

  // Ninja.aggregate().near({
  //   near: {
  //     'type': 'Point',
  //     'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
  //   },
  //   maxDistance: 100000,
  //   spherical: true,
  //   distanceField: "dis"
  // }).then((ninjas) => {
  //   res.status(200).send(ninjas);
  // }).catch(next);
});

// add a new ninja to the db
router.post("/", (req, res, next) => {
  Ninja.create(req.body).then(ninja => {
    res.status(200).send(ninja);
  }).catch(next);
});

// update a ninja in the db
router.put("/:id", (req, res, next) => {
  Ninja.findByIdAndUpdate({
      _id: req.params.id
    }, req.body)
    .then((ninja) => {
      Ninja.findById(req.params.id).then((ninja) => {
        res.status(200).send(ninja)
      })
    })
    .catch(next);
});

// delete a ninja in the db
router.delete("/:id", (req, res, next) => {
  Ninja.findByIdAndRemove({
      _id: req.params.id
    })
    .then((ninja) => {
      res.status(200).send(ninja)
    })
    .catch(next);
});

module.exports = router;