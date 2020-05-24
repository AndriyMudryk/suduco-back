const express = require("express");

const router = express.Router();

// Rest API
router.use("/auth", require("./auth"));
router.use("/rest/api/v1", require("./api"));

module.exports = router;