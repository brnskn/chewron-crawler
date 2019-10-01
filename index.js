const express = require("express");
const app = express();
const searchData = require("./elasticsearch/searchData");
const request = require("request");

async function search(text) {
  const body = {
    query: {
      match: {
        body: text
      }
    }
  };
  return await searchData("crawler", "contents", body).catch(error => {
    console.log(error);
  });
}

app.get("/", function(req, res) {
  search("IoT").then(function(resp) {
    request(resp.hits.hits[0]._source.url, function(error, response, body) {
      body = body
        .split("\n")
        .join("")
        .trim()
        .replace(/IoT/g, "<span style='background-color: yellow'>IoT</span>");
      res.send(body);
      console.log(resp.hits.hits[0]._source.url);
    });
  });
});

app.listen("8081");

exports = module.exports = app;
