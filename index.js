const express = require("express");

const rootPath = "./";
const config = require(rootPath + "config");
const logger = require(rootPath + "helpers/logger");

const server = express();


server.disable("x-powered-by");

const mode = config.mode;
logger.log("[index] X-Response-Time header added.");
server.use(require("response-time")());

logger.log("[index] Request logger middleware (ip, date, time, path, userAgent) added.");
require(rootPath + "middlewares/logger").initLogger(server);

const backendPort = config.backendPort;

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Add HTTP routes support
server.use(require("./controllers"));


const hostname = config.hostname;
server.listen(backendPort, hostname);

logger.log("[index] The server is running at " + hostname + ":" + backendPort + "/ in " + mode + " mode.");