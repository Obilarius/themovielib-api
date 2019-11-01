const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create movie Schema & model
const LibraryMovieSchema = new Schema({
  tmdb_popularity: {
    type: Number
  },
  tmdb_vote_count: {
    type: Number
  },
  video: {
    type: String
  },
  poster_path: {
    type: String
  },
  tmdb_id: {
    type: Number,
    required: [true, "TMDB ID is required"]
  },
  adult: {
    type: Boolean
  },
  backdrop_path: {
    type: String
  },
  original_language: {
    type: String
  },
  original_title: {
    type: String,
    required: [true, "Original Title is required"]
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  tmdb_vote_average: {
    type: Number
  },
  overview: {
    type: String
  },
  release_date: {
    type: String
  },
  genre_ids: {
    type: Array
  },
  adding_date: {
    type: Date
  }
  //   name: {
  //     type: String,
  //     required: [true, "Name is required"]
  //   },
  //   rank: {
  //     type: String
  //   },
  //   available: {
  //     type: Boolean,
  //     default: false
  //   }
});

const LibraryMovie = mongoose.model("library_movie", LibraryMovieSchema);

module.exports = LibraryMovie;
