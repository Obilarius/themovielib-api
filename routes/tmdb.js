const express = require("express");
const router = express.Router({
  strict: false
});
const axios = require("axios");
const LibraryMovie = require("../models/library_movie");

const tmdb_url = "https://api.themoviedb.org/3/";
const tmdb_apikey = "285a3801961b83d5dedcb2b3ec252cdf";

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

router.get("*", (req, res, next) => {
  const query = req.query;
  let url = tmdb_url + query.endpoint + "?api_key=" + tmdb_apikey;

  if (query.param != null) url += "&" + query.param.join("&");

  axios
    .get(url)
    .then(data => {
      res.send(data.data);
    })
    .catch(next);
});

// router.get("/movieInfo", (req, res, next) => {
//   const query = req.query;
//   const url =
//     "https://api.themoviedb.org/3/discover/movie?api_key=285a3801961b83d5dedcb2b3ec252cdf&language=de&sort_by=popularity.desc&include_video=false&page=" +
//     query.page;

//   axios.get(url).then(data => {
//     const movies = data.data.results;

//     let ids = [];

//     movies.forEach(movie => {
//       const date = randomDate(new Date(2012, 1, 1), new Date());
//       ids.push({
//         tmdb_popularity: movie.popularity,
//         tmdb_vote_count: movie.vote_count,
//         video: movie.video,
//         poster_path: movie.poster_path,
//         tmdb_id: movie.id,
//         adult: movie.adult,
//         backdrop_path: movie.backdrop_path,
//         original_language: movie.original_language,
//         original_title: movie.original_title,
//         title: movie.title,
//         tmdb_vote_average: movie.vote_average,
//         overview: movie.overview,
//         release_date: movie.release_date,
//         genre_ids: movie.genre_ids,
//         added_date: date
//       });
//     });
//     // .then(() => {
//     LibraryMovie.create(ids)
//       .then(movie => {
//         res.status(200).send(movie);
//       })
//       .catch(next);
//     // res.send(ids);
//     // })
//     // .catch(next);
//   });
// });

// router.get("/download", (req, res, next) => {
//   var fs = require("fs"),
//     request = require("request");

//   var download = (uri, filename, callback) => {
//     request.head(uri, function(err, res, body) {
//       console.log("content-type:", res.headers["content-type"]);
//       console.log("content-length:", res.headers["content-length"]);

//       request(uri)
//         .pipe(fs.createWriteStream(filename))
//         .on("close", callback);
//     });
//   };

//   const url =
//     tmdb_url +
//     "movie/popular" +
//     "?api_key=" +
//     tmdb_apikey +
//     "&language=de-de&page=5";

//   axios
//     .get(url)
//     .then(data => {
//       // res.send(data.data.results);

//       data.data.results.forEach(element => {
//         download(
//           "https://image.tmdb.org/t/p/w1280" + element.backdrop_path,
//           "img/backdrop_w1280" + element.backdrop_path,
//           function() {
//             // console.log(element.title + " downloaded");
//           }
//         );
//         download(
//           "https://image.tmdb.org/t/p/w185" + element.poster_path,
//           "img/poster_w185" + element.poster_path,
//           function() {
//             // console.log(element.title + " downloaded");
//           }
//         );
//         download(
//           "https://image.tmdb.org/t/p/w342" + element.poster_path,
//           "img/poster_w342" + element.poster_path,
//           function() {
//             // console.log(element.title + " downloaded");
//           }
//         );
//         download(
//           "https://image.tmdb.org/t/p/w500" + element.poster_path,
//           "img/poster_w500" + element.poster_path,
//           function() {
//             // console.log(element.title + " downloaded");
//           }
//         );
//       });

//       res.send("Alles gedownloaded!");
//     })
//     .catch(next);

//   // download(
//   //   "https://www.google.com/images/srpr/logo3w.png",
//   //   "google.png",
//   //   function() {
//   //     console.log("done");
//   //   }
//   // );
// });

module.exports = router;
