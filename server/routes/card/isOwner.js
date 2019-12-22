const Card = require("../../models/card");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const jwt = require('jsonwebtoken');
const secret = "7306a2b35da8e825c4b9e16177be028c44183c01f67a9c6a5b80844376f0425b02b6bc0d62087963513a4355fcb1a539e6dac0e1d4eb8969e62805bf522a783b";

router.post("/", (req, res, next) => {
    let token = req.body.jwt;
    let id = req.body.id;
    jwt.verify(token,secret,function(err,decoded){
        if(!err)
        Card.find({
            "_id": id, "userId": decoded.id
        })
        .then(function (document) {
            if(document.length)
            res.status(200).json(document);
            else  res.status(404).json({
                "message": "card is not yours"
            });
        }).catch(err => {
            res.status(404).json({
                "message": "card is not yours"
            });
        })

    })
});
module.exports = router;