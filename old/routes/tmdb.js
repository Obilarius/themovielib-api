const express = require("express");
const router = express.Router();
const axios = require("axios");
const isAuthorized = require("../middleware/auth");

const tmdb_url = "https://api.themoviedb.org/3/";
const tmdb_apikey = "285a3801961b83d5dedcb2b3ec252cdf";

router.get("*", isAuthorized, (req, res, next) => {
  const query = req.query;
  let url = tmdb_url + query.endpoint + "?api_key=" + tmdb_apikey;

  if (query.param != null) url += "&" + query.param.join("&");

  axios
    .get(url)
    .then(data => {
      res.send(data.data);
    })
    .catch(next);
});

module.exports = router;