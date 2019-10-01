const esClient = require("./client");
const searchData = async function(indexName, mappingType, payload) {
  return await esClient.search({
    index: indexName,
    type: mappingType,
    body: payload
  });
};

module.exports = searchData;
