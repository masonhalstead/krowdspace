const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(MONGO_DB) {
  mongoose
    .connect(MONGO_DB, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => winston.info('Connected to MongoDB...'));
};
