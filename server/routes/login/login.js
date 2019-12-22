const User = require("../../models/user");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const secret =
  "7306a2b35da8e825c4b9e16177be028c44183c01f67a9c6a5b80844376f0425b02b6bc0d62087963513a4355fcb1a539e6dac0e1d4eb8969e62805bf522a783b";

router.post("/", (req, res, next) => {
  const { user, password } = req.body;
  User.find({ user, password })
    .then(document => {
      const thisUser = { id: document[0]._id, user: document[0].user };

      const token = jwt.sign(thisUser, secret, { expiresIn: "60m" });
      res.status(200).json({ token });
    })
    .catch(err => {
      res.status(400).json({ error: "invalid user or password " });
    });
});

module.exports = router;
