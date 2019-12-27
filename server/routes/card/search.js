const express = require("express");
const router = express.Router();
const https = require("https");
const API_KEY = "14754518-74299781eef1ba75bccaa23b5";

router.post("/", (req, res, next) => {
  const { searchContent } = req.body;

  let url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchContent
  )}`;

  https
    .get(url, response => {
      const { statusCode } = response;
      const contentType = response.headers["content-type"];

      let error;
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          "Invalid content-type.\n" +
            `Expected application/json but received ${contentType}`
        );
      }
      if (error) {
        response.resume();
        return;
      }

      response.setEncoding("utf8");
      let rawData = "";
      response.on("data", chunk => {
        rawData += chunk;
      });
      response.on("end", () => res.status(200).json(JSON.parse(rawData)));
    })
    .on("error", e => {
      console.error(`Got error: ${e.message}`);
    });
});

module.exports = router;
