const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const path = require("path");
// const photo = require("./routes/photos/post");
// const results = require("./routes/results/get");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "100mb" }));
// app.use("/photo", photo);
// app.use("/results", results);

mongoose 
  .connect(
    "mongodb+srv://todireanugeorge15:alabalaportocala@cluster0-otq8c.mongodb.net/test?retryWrites=true&w=majority"
    )
  .then(result => {
    app.listen(5000);
  })
  .catch(err => console.log(err));
