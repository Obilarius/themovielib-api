const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create movie Schema & model
const MovieSchema = new Schema({
  language: String,
  adult: Boolean,
  backdrop_path: String,
  belongs_to_collection: {
    id: Number,
    name: String,
    poster_path: String,
    backdrop_path: String
  },
  budget: Number,
  genres: Array,
  homepage: String,
  tmdb_id: {
    type: Number,
    index: true
  },
  imdb_id: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: Array,
  production_countries: Array,
  release_date: Date,
  revenue: Number,
  runtime: Number,
  spoken_languages: Array,
  status: String,
  tagline: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  videos: {
    results: Array
  },
  images: {
    backdrops: Array,
    posters: Array
  },
  external_ids: {
    imdb_id: String,
    facebook_id: String,
    instagram_id: String,
    twitter_id: String
  },
  keywords: {
    keywords: Array
  },
  release_dates: {
    results: Array
  }
});


module.exports = mongoose.model("movie", MovieSchema);;