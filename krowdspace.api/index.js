const dotenv = require("dotenv");
const winston = require("winston");
dotenv.config();
const { MONGO_DB, PRIVATE_KEY, NODE_ENV } = process.env;

const express = require("express");
const app = express();

require("./startup/logging")(MONGO_DB);
require("./startup/routes")(app);
require("./startup/db")(MONGO_DB);
require("./startup/config")(PRIVATE_KEY);
require("./startup/validation");

if (NODE_ENV === "production") {
  require("./startup/prod")(app);
}

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
