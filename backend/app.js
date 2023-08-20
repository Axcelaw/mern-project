const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected successfully to database."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});
