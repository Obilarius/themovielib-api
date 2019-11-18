const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const privateKey = require("../config/authPrivateKey");

router.get("/jwt", (req, res, next) => {
  const token = jwt.sign(
    {
      body: "stuff"
    },
    privateKey
  );

  res.send(token);
});

module.exports = router;
