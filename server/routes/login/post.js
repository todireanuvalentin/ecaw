const User = require("../../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/", (req, res, next) => {
  const { user, password } = req.body;

  const login = new User({
    _id: new mongoose.Types.ObjectId(),
    user,
    password
  });

  login
    .save()
    .then(result => {
      res.status(201).json({
        message: "Insert User"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
