/*global console*/
/* eslint-disable no-console */
const fs = require("fs");

const rootPath = "../";
const config = require(rootPath + "config");

const logDirectory = config.projectDir + "/" + config.logDir;

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

function appendMessage(fileName, message) {
  fs.appendFileSync(logDirectory + "/" + fileName, message);
}

function getDate() {
  return new Date().toUTCString();
}

module.exports = {

  log: function(message) {
    const date = getDate();

    console.log("Log: " + date + " *** " + message);
    appendMessage("js.log", "Log: " + date + " *** " + message + "\n");
  },

  error: function(message, error) {
    const date = getDate();

    let errorMessage = "";
    if (error) {
      errorMessage = "\nMessage: " + error.message;
    }
    console.error("Error: " + date + " *** " + message + errorMessage);
    appendMessage("error.log", "Error: " + date + " *** " + message + errorMessage + "\n");
  },

  warning: function(message) {
    const date = getDate();

    console.log("Warning: " + date + " *** " + message);
    appendMessage("warning.log", "Date: " + date + "; " + message + "\n");
  },

  info: function(message) {
    const date = getDate();

    console.info("Info: " + date + " *** " + message);
    appendMessage("info.log", "Date: " + date + "; " + message + "\n");
  },

  trace: function(message) {
    const date = getDate();

    console.info("Trace: " + date + " *** " + message);
    appendMessage("trace.log", "Date: " + date + "; " + message + "\n");
  },

  debug: function(message) {
    const date = getDate();

    console.info("Debug: " + date + " *** " + message);
    appendMessage("debug.log", "Date: " + date + "; " + message + "\n");
  }
};
/* eslint-enable no-console */