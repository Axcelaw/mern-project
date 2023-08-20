const express = require("express");
const router = express.Router();
const { sayHello } = require("../controllers/UserController");

router.get("/", sayHello);

module.exports = router;
