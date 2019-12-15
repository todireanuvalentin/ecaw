const User = require("../../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  user
    .findById(id)
    .select("name password")
    .exec()
    .then(document => {
      const response = document.map(index => {
        return {
          _id: index._id,
          name,
          password
        };
      });
      res.status(200).json(response);
    })
    .catch(error => console.log(error));
});
