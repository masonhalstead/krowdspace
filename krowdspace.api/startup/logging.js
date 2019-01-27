const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function(MONGO_DB) {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "./logfile.log" }),
    new winston.transports.Console()
  );
  winston.createLogger(
    new winston.transports.File({ filename: "./logfile.log" })
  );
  winston.createLogger(
    new winston.transports.MongoDB({
      db: MONGO_DB,
      collection: "log",
      level: "error"
    })
  );
};
