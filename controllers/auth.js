  
const express = require("express");
const bodyParser = require("body-parser");

const rootPath = "../";
const logger = require(rootPath + "helpers/logger");
const User = require(rootPath + "models/User");
const urlencodedParser = bodyParser.urlencoded({extended: false});// Create application/x-www-form-urlencoded parser
const {
  wrapPromiseResponse,
  getRequestRemoteAddress
} = require(rootPath + "helpers/utils");

const router = express.Router();

router.post("/getToken", urlencodedParser, wrapPromiseResponse(
  function (req) {
    const body = req.body;
    return User.getToken(
      {
        email: body.email,
        password: body.password,
        ip: getRequestRemoteAddress(req)
      }
    );
  }
));

router.post("/register", urlencodedParser, wrapPromiseResponse(
  function (req) {
    const body = req.body;
    return User.createUser(
      {
        email: body.email,
        password: body.password
      }
    );
  }
));

router.get("/me", wrapPromiseResponse(
  function (req) {
    return User.getCurrentUserInfo(req);
  }
));

router.get("*", function (req, res) {
  const message = "No service found";
  const statusCode = 404;

  res.status(statusCode);
  res.send({
    status: statusCode,
    message: message,
    type: "request"
  });
  logger.error("No api auth rest service found. Request url: " + req.originalUrl);
});

module.exports = router;