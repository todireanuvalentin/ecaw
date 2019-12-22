const User = require("../../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

router.post("/", (req, res, next) => {
  const { user, password } = req.body;

  User.find({ user })
    .exec()
    .then(el => {
      if (el.length) {
        res.status(409).json({
          message: "Username already exists"
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            new User({
              _id: new mongoose.Types.ObjectId(),
              user,
              password: hash
            }).save()
              .then(result => res.status(201).json({ message: "User created" }))
              .catch(err => res.status(500).json({ error: err }));
          }
        });
      }
    });
});

module.exports = router;
