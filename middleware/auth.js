const jwt = require("jsonwebtoken")

function isAuthorized(req, res, next) {
  // IN Body
  // { 
  //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijoic3R1ZmYiLCJpYXQiOjE1NzM1Njc0NTB9.map9QvfgsFfg613OfZUyPB9QCJV3yDCNar6yczHKj2c"
  // }

  const token = req.headers.authorization.split(" ")[1]

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Auth failed"
      })
    }

    return next();
  })
}

module.exports = isAuthorized;