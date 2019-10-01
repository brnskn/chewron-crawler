var supercrawler = require("supercrawler");
const createIndex = require("./elasticsearch/createIndex");
const putMapping = require("./elasticsearch/putMapping");
const insertData = require("./elasticsearch/insertData");

async function setIndex() {
  return await createIndex("crawler").catch(() => {
    console.log("Index already exists");
  });
}

async function setMapping() {
  const mapping = {
    properties: {
      url: {
        type: "text"
      },
      body: {
        type: "text"
      }
    }
  };
  return await putMapping("crawler", "contents", mapping).catch(() => {
    console.log("Mapping already exists");
  });
}

async function insert(url, body) {
  const data = {
    url: url,
    body: body
  };
  return await insertData("crawler", url, "contents", data).catch(error => {
    console.log(error);
  });
}

async function start() {
  await setIndex();
  await setMapping();

  var crawler = new supercrawler.Crawler({
    interval: 0,
    concurrentRequestsLimit: 5,
    robotsCacheTime: 3600000
  });

  crawler.addHandler(supercrawler.handlers.robotsParser());

  crawler.addHandler(supercrawler.handlers.sitemapsParser());

  crawler.addHandler("text/html", function(context) {
    insert(context.url, context.$("main").text());
  });

  crawler
    .getUrlList()
    .insertIfNotExists(new supercrawler.Url("https://www.chevron.com"))
    .then(function() {
      return crawler.start();
    });

  crawler.on("crawlurl", function(url) {
    console.log("Crawling " + url);
  });
}

start();
