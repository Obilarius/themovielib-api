const express = require("express");
const router = express.Router();
const axios = require("axios");
const passport = require("passport");

router.get("*", passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  const query = req.query;
  let url = process.env.TMDB_URL + query.endpoint + "?api_key=" + process.env.TMDB_API_KEY;

  if (query.param != null) url += "&" + query.param.join("&");

  console.log(url)

  axios
    .get(url)
    .then(data => {
      res.send(data.data);
    })
    .catch(next);
});

module.exports = router;