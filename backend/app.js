const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const userRoutes = require("./routes/UserRoute");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected successfully to database."))
  .catch((err) => console.log(err));

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});
