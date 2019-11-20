const express = require("express");
const router = express.Router();
const Axios = require("axios")
const paginatedResults = require("../middleware/paginatedResults");
const isAuthorized = require("../middleware/auth");
const Movie = require("../models/movie");

// get a list of movie from the db
router.get("/", paginatedResults(Movie), (req, res, next) => {
  //   LibraryMovie.find()
  //     .then(movie => {
  //       res.status(200).send(movie);
  //     })
  //     .catch(next);


  res.paginatedResults.results.forEach(movie => {
    movie.images.backdrops = movie.images.backdrops.slice(0, 5);
    movie.images.posters = movie.images.posters.slice(0, 5);
  });

  // res.json(res.paginatedResults.results[0].images.backdrops.length);
  res.json(res.paginatedResults)
});

// get a movie by id
router.get("/:tmdb_id", (req, res, next) => {
  Movie.findOne({
      tmdb_id: request.params.tmdb_id
    })
    .then(movie => {
      res.status(200).send(movie);
    })
    .catch(next);
});

// add or update a movie to the db
router.post("/", isAuthorized, (req, res, next) => {
  const filter = {
    tmdb_id: req.body.tmdb_id
  };
  const update = req.body;
  const options = {
    upsert: true,
    new: true
  };

  Movie.findOneAndUpdate(filter, update, options)
    .then(movie => {
      res.status(201).send(movie);
    })
    .catch(next);
});

// // update a movie in the db
// router.put("/:id", (req, res, next) => {
//   LibraryMovie.findByIdAndUpdate({
//         _id: req.params.id
//       },
//       req.body
//     )
//     .then(movie => {
//       Movie.findById(req.params.id).then(movie => {
//         res.status(200).send(movie);
//       });
//     })
//     .catch(next);
// });

// delete a movie in the db
router.delete("/:id", isAuthorized, (req, res, next) => {
  Movie.findByIdAndRemove({
      _id: req.params.id
    })
    .then(movie => {
      res.status(200).send(movie);
    })
    .catch(next);
});



router.get("/demo/images/", isAuthorized, (req, res, next) => {
  Movie.find()
    .then(async movies => {
      await Promise.all(movies.map(async (movie, index) => {
        const imageUrl = `https://api.themoviedb.org/3/movie/${movie.tmdb_id}/images?api_key=285a3801961b83d5dedcb2b3ec252cdf`

        setTimeout(async () => {
          const imageData = await Axios.get(imageUrl)
          const images = imageData.data;
          movie.images.backdrops = images.backdrops;
          movie.images.posters = images.posters;

          console.log(index);
          movie.save();
        }, 300 * index);
      }));

      res.send("Alles OK");
    })
    .catch(next);
})


router.get("/demo/:page", isAuthorized, (req, res, next) => {
  const page = req.params.page;
  const tmdb_api_url_popular = "https://api.themoviedb.org/3/movie/popular?api_key=285a3801961b83d5dedcb2b3ec252cdf&language=de-de&page=" + page;
  const movie_urls = [];
  const fullMovies = [];

  // Axios
  //   .get(tmdb_api_url_popular)
  //   .then(data => {
  //     const movies = data.data.results;

  //     movies.forEach(movie => {
  //       const tmdb_api_url_movie = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=285a3801961b83d5dedcb2b3ec252cdf&language=de-de&append_to_response=videos,images,external_ids,keywords,release_dates`;
  //       movie_urls.push(tmdb_api_url_movie);
  //     });
  //   })
  //   .then(async () => {

  // await Promise.all(movie_urls.map(async (url) => {
  //   const movieData = await Axios.get(url);
  //   const movie = movieData.data;
  //   movie.tmdb_id = movie.id;

  //   fullMovies.push(movie);
  // }));

  // await Promise.all(fullMovies.map(async (movie) => {
  //   const imageUrl = `https://api.themoviedb.org/3/movie/${movie.tmdb_id}/images?api_key=285a3801961b83d5dedcb2b3ec252cdf`
  //   const imageData = await Axios.get(imageUrl);
  //   const images = imageData.data;
  //   // movie.images.backdrops.push(images.backdrops);
  //   // movie.images.posters = images.posters;
  // }));

  // await Promise.all(fullMovies.map(async (movie) => {
  //   const filter = {
  //     tmdb_id: movie.tmdb_id
  //   };
  //   const update = movie;
  //   const options = {
  //     upsert: true,
  //     new: true
  //   };

  //   Movie.findOneAndUpdate(filter, update, options)
  //     .then()
  //     .catch(next);
  // }));

  //   res.send(fullMovies);



  // })
  // .catch(next);
});

module.exports = router;