const express = require("express");
const router = express.Router({
  strict: false
});
const axios = require("axios");

const tmdb_url = process.env.TMDB_URL;
const tmdb_apikey = process.env.TMDB_API_KEY;

router.get("*", (req, res, next) => {
  const query = req.query;
  const url = tmdb_url + query.endpoint + "?api_key=" + tmdb_apikey + "&" + query.param.join("&")

  axios.get(url)
    .then(data => {
      res.send(data.data);
    })
    .catch(next);

});


module.exports = router;