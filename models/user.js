const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiarySchema = new Schema({
  movie_id: String,
  viewed_on: Date,
  rating: Number
});

const LibrarySchema = new Schema({
  movie_id: String,
  added_on: Date,
  medium: String,
  viewed: Boolean
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
  password: { type: String, required: true },
  givenname: String,
  surname: String,
  birthday: Date,
  Location: {
    zip: Number,
    city: String,
    country: String
  },
  website: String,
  bio: String,
  avatar: String,
  is_admin: { type: Boolean, default: false },
  watchlist: Array,
  diary: [DiarySchema],
  library: [LibrarySchema]
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
