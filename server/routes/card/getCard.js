const Card = require("../../models/card");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const secret =
  "7306a2b35da8e825c4b9e16177be028c44183c01f67a9c6a5b80844376f0425b02b6bc0d62087963513a4355fcb1a539e6dac0e1d4eb8969e62805bf522a783b";

router.get("/:id", (req, res, next) => {
  let id = req.params.id;

  Card.find({
    _id: id
  })
    .then(function(document) {
      res.status(200).json(document);
    })
    .catch(err => {
      res.status(404).json({
        error: "card not found"
      });
    });
});

router.post("/:id", (req, res, next) => {
  let id = req.params.id;
  let token = req.body.jwt;
  jwt.verify(token, secret, function(err, decoded) {
    if (err) return res.status(401).json({ message: "Not authorized" });
    Card.find({
      _id: id,
      userId: decoded.id
    })
      .then(document => {
        res.status(200).json(document);
      })
      .catch(err => {
        res.status(404).json({
          message: "card not found"
        });
      });
  });
});

router.post("/", (req, res, next) => {
  let token = req.body.jwt;

  jwt.verify(token, secret, function(err, decoded) {
    if (!err) {
      Card.find({ userId: decoded.id })
        .sort({ date: -1 })
        .then(document => res.status(200).json(document))
        .catch(_err =>
          res.status(404).json({
            error: "Can not save card"
          })
        );
    } else res.status(401).json({ error: "The session has expired" });
  });
});

module.exports = router;
