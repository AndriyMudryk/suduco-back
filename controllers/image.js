const express = require("express");
const bodyParser = require("body-parser");

const rootPath = "../";
const logger = require(rootPath + "helpers/logger");
const Image = require(rootPath + "models/Image");
const {
  wrapPromiseResponse,
  wrapPromiseErrorCatch,
} = require(rootPath + "helpers/utils");

const formidable = require("express-formidable");

const router = express.Router();


/*router.get("/:userPhotoFileName", wrapPromiseErrorCatch(
  function (req, res) {
    const fileName = req.params.userPhotoFileName;
    return Image.getImageFile(res, fileName);
  }
));

router.get("/", wrapPromiseResponse(
  function (req) {
    const userId = req.query.userId;
    return Image.getImages(userId);
  }
))
*/
router.post("/", formidable(), wrapPromiseResponse(
  function (req) {
    const file = req.files.file;
    return Image.saveImage(file/*, req.fields.userId*/);
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
  logger.error("No api image rest service found. Request url: " + req.originalUrl);
});

module.exports = router;