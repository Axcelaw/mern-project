const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
