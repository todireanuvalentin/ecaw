const User = require("../../models/user");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret =
  "7306a2b35da8e825c4b9e16177be028c44183c01f67a9c6a5b80844376f0425b02b6bc0d62087963513a4355fcb1a539e6dac0e1d4eb8969e62805bf522a783b";

router.post("/", (req, res, next) => {
  const { user, password } = req.body;

  User.find({ user })
    .exec()
    .then(el => {
      if (!el.length) {
        res.status(401).json({
          message: "Login failed"
        });
      } else {
        bcrypt.compare(password, el[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Login failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                id: el[0]._id,
                user: el[0].user
              },
              secret,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Login successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Login failed"
          });
        });
      }
    })
    .catch(err => {
      res.status(400).json({ error: "invalid user or password " });
    });
});

module.exports = router;
