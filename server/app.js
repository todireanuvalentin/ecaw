const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const path = require("path");

const getLogin = require('./routes/login/verify.js');
const postCard = require('./routes/card/createCard.js');
const getCard = require('./routes/card/getCard.js');
const isOwner = require('./routes/card/isOwner.js');
const update = require('./routes/card/update.js');
const app = express();

app.use(cors());
app.options('*', cors())


app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "100mb" }));

app.use('/register', require('./routes/login/register'));

app.use('/login', require('./routes/login/login'));
app.use('/verify', getLogin);
app.use('/create', postCard);
app.use('/get', getCard);
app.use('/isOwner', isOwner);
app.use('/update', update);

mongoose 
  .connect(
    "mongodb+srv://todireanugeorge15:alabalaportocala@cluster0-otq8c.mongodb.net/test?retryWrites=true&w=majority"
    )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
