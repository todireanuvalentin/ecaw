const User = require("../../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/", (req, res, next) => {
  const { user, password } = req.body;

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    user,
    password // TO DO: encrypt password
  });

  newUser
    .save()
    .then(() =>
      res.status(201).json({
        message: "Register successfully done"
      })
    )
    .catch(err =>
      res.status(500).json({
        error: err
      })
    );
});

module.exports = router;
