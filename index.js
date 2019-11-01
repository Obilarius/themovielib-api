const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const cors = require("cors");
require("dotenv").config();

// set up express app
const app = express();

// connect to mongoDB
mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;

// CORS
app.use(cors());

app.use(express.static("public"));

app.use(bodyParser.json());

// init routes
app.use("/lib", require("./routes/library"));
// app.use("/ninjas", require("./routes/ninjas"));
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
app.listen(port, function() {
  console.log(`Server now listening on port ${port}`);
});
