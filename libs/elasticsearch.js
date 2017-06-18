const logger = require('./logger');
const elasticSearch = require('elasticsearch');

const client = new elasticSearch.Client({
  host: process.env.LOG_ES_HOST || 'localhost:9200',
  log: 'trace',
});

// ------------------------------ INDEX ------------------------------ //
// Create a new index
exports.createIndex = (esIndex) => {
  client.indices.create({
    index: esIndex,
  }, (err, res) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info(`Index ${esIndex} created successfully.`);
      logger.info(res);
    }
  });
};

// Delete a exsist index
exports.deleteIndex = (esIndex) => {
  client.indices.delete({
    index: esIndex,
  }, (err, res) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info(`Index ${esIndex} deleted successfully.`);
      logger.info(res);
    }
  });
};

// ------------------------------ DOCUMENT ------------------------------ //
// List all documents in a index
exports.searchDocument = (esIndex, esType, data) => client.search({
  index: esIndex,
  type: esType,
  body: {
    query: {
      match: data,
    },
  },
});


// Create a document
exports.createDocument = (esIndex, esType, data) => {
  client.create({
    index: esIndex,
    type: esType,
    body: data,
  }, (err, res) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info('Create a index successfully');
      logger.info(res);
    }
  });
};


// Delete by query document
exports.deleteDocument = (esIndex, esType, data) => {
  client.deleteByQuery({
    index: esIndex,
    type: esType,
    body: {
      query: {
        match: data,
      },
    },
  }, (err, res) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info(res);
    }
  });
};

// Delete document by id
exports.deleteDocumentById = (esIndex, esType, esId) => {
  client.delete({
    index: esIndex,
    type: esType,
    id: esId,
  }, (err, res) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info(res);
    }
  });
};

// Update document
exports.updateDocument = (esIndex, esType, esId, data) => {
  client.update({
    index: esIndex,
    type: esType,
    id: esId,
    body: {
      doc: data,
    },
  }, (err, res) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info(res);
    }
  });
};
