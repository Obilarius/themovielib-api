const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// set up express app
const app = express();

// connect to mongoDB
mongoose.connect(
  "mongodb+srv://apiuser:Q1qWJoUWrnwexfOp@themovielib-7zind.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);
mongoose.Promise = global.Promise;

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
// init routes
app.use("/api", require("./routes/api"));
// error handling middleware
app.use((err, req, res, next) => {
  res.status(400).send({
    error: err.message
  });
});

// port
const port = process.env.port || 4000;
// listen for requests
app.listen(port, function() {
  console.log(`Server now listening on port ${port}`);
});
