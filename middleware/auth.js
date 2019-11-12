const jwt = require("jsonwebtoken")
const privateKey = require("../config/authPrivateKey")

function isAuthorized(req, res, next) {
  // if (typeof req.header.auth !== "undefined") {
  //   const token = req.header.auth.split(" ")[1]

  // IN Body
  // {
  //   "auth": { 
  //     "type": "jwt", 
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijoic3R1ZmYiLCJpYXQiOjE1NzM1Njc0NTB9.map9QvfgsFfg613OfZUyPB9QCJV3yDCNar6yczHKj2c"
  //   }
  // }

  if (req.body.auth != null) {
    const token = req.body.auth.token

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        res.status(500).json({
          error: "Not Authorized"
        })
      }

      console.log(decoded);
      return next();
    })
  } else {
    res.status(500).json({
      error: "Not Authorized"
    })
  }
}

module.exports = isAuthorized;