const User = require("../../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

    User.find({_id:id})
  .then(function(document){
    return res.json(document);
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });

});
  module.exports = router;
