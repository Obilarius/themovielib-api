const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiarySchema = new Schema(
  {
    movieId: String,
    viewedOn: Date,
    rating: Number
  },
  {
    timestamps: true
  }
);

const LibrarySchema = new Schema(
  {
    movieId: String,
    addedOn: Date,
    medium: String,
    viewed: Boolean
  },
  {
    timestamps: true
  }
);

const WatchlistSchema = new Schema(
  {
    movieId: String
  },
  {
    timestamps: true
  }
);

// create movie Schema & model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: [true, "Username is required"]
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"]
    },
    password: {
      type: String,
      required: [true, "Pasword is required"]
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
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
