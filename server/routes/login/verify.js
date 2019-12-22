const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret =
  "7306a2b35da8e825c4b9e16177be028c44183c01f67a9c6a5b80844376f0425b02b6bc0d62087963513a4355fcb1a539e6dac0e1d4eb8969e62805bf522a783b";

router.post("/", (req, res, next) => {
  let token = req.body.jwt;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, secret, function(err, decoded) {
    if (err) return res.status(403).json({ message: "not ok" });
    next();
  });
  res.status(200).json({ message: "ok" });
});

module.exports = router;
