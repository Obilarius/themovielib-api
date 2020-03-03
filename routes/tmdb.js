const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  const query = req.query;
  let url = process.env.TMDB_URL + query.endpoint + "?api_key=" + process.env.TMDB_API_KEY;

  if (query.param != null) url += "&" + query.param.join("&");

  axios
    .get(url)
    .then(data => {
      res.send(data.data);
    })
    .catch(next);
});

module.exports = router;