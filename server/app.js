const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const path = require("path");

const getLogin = require('./routes/login/get');
const app = express();

app.use(cors());
app.options('*', cors())


app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "100mb" }));

app.use('/register', require('./routes/login/register'));

app.use('/login',require('./routes/login/login'));
app.use('/lala', getLogin);




mongoose 
  .connect(
    "mongodb+srv://todireanugeorge15:alabalaportocala@cluster0-otq8c.mongodb.net/test?retryWrites=true&w=majority"
    )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
