const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  movie_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Library = mongoose.model("library", LibrarySchema);

module.exports = Library;