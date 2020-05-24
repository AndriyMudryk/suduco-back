module.exports = {
  initLogger: function (server) {
    const morgan = require("morgan");
    const fs = require("fs");
    const rootPath = "./../";
    const config = require(rootPath + "config");
    const logDirectory = config.projectDir + "/" + config.logDir;

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    server.use(
      morgan("combined", {
        stream: fs.createWriteStream(logDirectory + "/access.log", {
          flags: "a"
        })
      })
    );
  }
};