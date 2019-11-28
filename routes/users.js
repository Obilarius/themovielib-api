const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const isAuthorized = require("../middleware/auth")
const User = require("../models/user");
const privateKey = require("../config/authPrivateKey")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/avatars');
  },
  filename: function (req, file, cb) {
    const date = new Date().toISOString()
    const name = date.replace(/:/g, '-') + "_" + file.originalname
    cb(null, name);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  // fileSize in Byte
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 0.2
  }
});



// Handle Signup
router.post("/signup", async (req, res, next) => {
  const {
    username,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({
      msg: "Please enter all fields"
    });
    res.status(400).send(errors);
    return;
  }

  if (password != password2) {
    errors.push({
      key: "password",
      msg: "Passwords do not match"
    });
  }

  if (password.length < 6) {
    errors.push({
      key: "password",
      msg: "Password must be at least 6 characters"
    });
  }

  await User.findOne({
    email: email
  }).then(user => {
    if (user) {
      errors.push({
        key: "email",
        msg: "Email is already registered"
      });
    }
  });

  await User.findOne({
    username: username
  }).then(user => {
    if (user) {
      errors.push({
        key: "username",
        msg: "Username is already registered"
      });
    }
  });

  if (errors.length > 0) {
    res.status(409).send(errors);
  } else {
    // Validation passed

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = new User({
          username: username,
          email: email,
          password: hash
        });
        user
          .save()
          .then(result => {
            res.status(201).send(result);
          })
          .catch(next);
      }
    });
  }
});

// Handle Login
router.post("/login", (req, res, next) => {
  User.findOne({
      $or: [{
          email: req.body.username
        },
        {
          username: req.body.username
        }
      ]
    })
    .then(user => {
      if (user == null) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        // error on compare
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }

        // Login successful
        if (result) {
          const token = jwt.sign({
              userId: user._id,
              email: user.email,
              username: user.username,
              isAdmin: user.isAdmin,
              avatar: user.avatar
            },
            privateKey, {
              expiresIn: "1h"
            }
          );

          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }

        // password dont match
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(next);
});

router.delete("/:userId", isAuthorized, (req, res, next) => {
  User.remove({
      _id: req.params.userId
    })
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(next);
});

router.patch("/:userId", isAuthorized, upload.single("avatar"), (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, {
      ...req.body,
      avatar: req.file.path
    })
    .then(result => {
      res.status(200).json({
        message: "User updatet"
      });
    })
    .catch(next);

});

module.exports = router;