const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiarySchema = new Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
    required: true
  },
  viewedOn: Date,
  rating: Number
}, {
  timestamps: true
});

// const Diary = mongoose.model("diary", DiarySchema);
// module.exports = Diary;

const LibrarySchema = new Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
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

// const Library = mongoose.model("library", LibrarySchema);
// module.exports = Library;

const WatchlistSchema = new Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
    required: true
  }
}, {
  timestamps: true
});

// const Watchlist = mongoose.model("watchlist", WatchlistSchema);
// module.exports = Watchlist;

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

const User = mongoose.model("user", UserSchema);
module.exports = User;