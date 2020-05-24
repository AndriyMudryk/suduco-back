const express = require("express");

const rootPath = "../";

const logger = require(rootPath + "helpers/logger");
const {
  wrapPromiseResponse
  
} = require(rootPath + "helpers/utils");

const router = express.Router();

router.use("/image", require("./image"));


router.get("*", function (req, res) {
  const message = "No service found";
  const statusCode = 404;

  res.status(statusCode);
  res.send({
    status: statusCode,
    message: message,
    type: "request"
  });
  logger.error("No api rest service found. Request url: " + req.originalUrl);
});

module.exports = router;