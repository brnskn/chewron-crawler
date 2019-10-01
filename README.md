# Chevron Crawler

#### Installation

##### PM2

`npm install pm2`

##### Elastic Search

Check it out: https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html

##### Crawler

In this directory:

- Run: `npm install` to install the dependencies.
- Run: `pm2 start crawler.js`
  And then wait for the indexing. After the indexing end:
- Run: `pm2 start index.js`
- Run: `pm2 save`
  Go to 'http://localhost:8081'
