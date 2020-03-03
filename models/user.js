const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiarySchema = new Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  viewedOn: Date,
  rating: Number
}, {
  timestamps: true
});

const LibrarySchema = new Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  medium: String,
  viewed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const WatchlistSchema = new Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  }
}, {
  timestamps: true
});

// create movie Schema & model
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  givenname: String,
  surname: String,
  birthday: Date,
  location: {
    zip: Number,
    city: String,
    country: String
  },
  website: String,
  bio: String,
  avatar: String,
  isAdmin: {
    type: String,
    default: false
  },
  watchlist: [WatchlistSchema],
  diary: [DiarySchema],
  library: [LibrarySchema]
}, {
  timestamps: true
});

module.exports = mongoose.model("user", UserSchema);;