const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Passport Config
require("./config/passport")

// set up express app
const app = express();

// Connect to mongoDB
mongoose.connect(
    process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
  .then(console.log("MongoDB Connected..."))
  .catch(err => console.log(err))

// Middleware
app.use(cors());
app.use(express.static("public")); // show HTML File in Browser
app.use("/uploads/", express.static("uploads")); // for FileUpload
app.use(bodyParser.json());

// Routes
app.use("/user", require("./routes/user"));
app.use("/movie", require("./routes/movie"));
app.use("/library", require("./routes/library"));
app.use("/tmdb", require("./routes/tmdb"));


// error handling middleware
app.use((err, req, res, next) => {
  res.status(400).send({
    error: err.message
  });
});

// port
const port = process.env.PORT || 4000;
// listen for requests
app.listen(port, function () {
  console.log(`Server now listening on port ${port}`);
});