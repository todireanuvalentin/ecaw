const Card = require("../../models/card");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const secret = "7306a2b35da8e825c4b9e16177be028c44183c01f67a9c6a5b80844376f0425b02b6bc0d62087963513a4355fcb1a539e6dac0e1d4eb8969e62805bf522a783b";

router.post("/", (req, res, next) => {
    const {description, data,img} = req.body;
  let token = req.body.jwt;
  if(!token)res.status(401).json({"message":"not autorized"})



  const userId=jwt.verify(token,secret)["id"];
  const idCard =new mongoose.Types.ObjectId()
  const card = new Card({
    _id: idCard,
    userId,
    description,
    data,
    img,
  });
  jwt.verify(token,secret,function(error,decoded){
    if(!error){
        card
        .save()
        .then(result => {
          res.status(201).json({
            "idCard": idCard
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });

    }
    else res.status(401).json({"message":"not autorized"})

  })
});

module.exports = router;
