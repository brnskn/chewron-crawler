const esClient = require("./client");
const putMapping = async function(indexName, mappingType, mapping) {
  console.log(mapping);
  return await esClient.indices.putMapping({
    index: indexName,
    type: mappingType,
    body: mapping
  });
};

module.exports = putMapping;
