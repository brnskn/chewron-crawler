const esClient = require("./client");

const insertData = async function(indexName, _id, mappingType, data) {
  return await esClient.index({
    index: indexName,
    type: mappingType,
    id: _id,
    body: data
  });
};

module.exports = insertData;
