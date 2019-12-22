const User = require("../../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose 
  .connect(
    "mongodb+srv://todireanugeorge15:alabalaportocala@cluster0-otq8c.mongodb.net/test?retryWrites=true&w=majority"
    )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));

router.post("/", (req, res, next) => {
  const { user, password } = req.body;

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    user,
    password
  });

  newUser
    .save()
    .then(result => {
      res.status(201).json({
        message: "Register successfully done"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
