const jwt = require("jsonwebtoken")

function isAuthorized(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Auth failed"
    })
  }
  const token = req.headers.authorization.split(" ")[1]

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Auth failed"
      })
    }

    res.jwt_decoded = decoded;

    return next();
  })
}

module.exports = isAuthorized;