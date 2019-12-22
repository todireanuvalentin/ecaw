const Card = require("../../models/card");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const secret =
  "7306a2b35da8e825c4b9e16177be028c44183c01f67a9c6a5b80844376f0425b02b6bc0d62087963513a4355fcb1a539e6dac0e1d4eb8969e62805bf522a783b";

router.post("/", (req, res, next) => {
  let token = req.body.jwt;
  let id = req.body.idCard;

  jwt.verify(token, secret, function(error, decoded) {
    if (error) {
      res.status(401).json(error);
    } else {
      Card.findOne({ userId: decoded.id, _id: id }, function(err, foundObject) {
        if (err) res.status(500).json(err);
        else {
          if (!foundObject) res.status(404).json({ error: "404" });
          else {
            foundObject.description = req.body.description;
            foundObject.img = req.body.img;
            foundObject.data = req.body.data;
            foundObject.save(function(err, updatedObject) {
              if (err) res.status(500).json(err);
              else res.status(201).json(updatedObject);
            });
          }
        }
      });
    }
  });
});
module.exports = router;