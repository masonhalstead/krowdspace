const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const users = require("./routes/users");
const campaigns = require("./routes/campaigns");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

if (!process.env.PRIVATE_KEY) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/krowdspace")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/campaigns", campaigns);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
