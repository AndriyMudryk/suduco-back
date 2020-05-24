const util = require("util");

const rootPath = "../";
const logger = require(rootPath + "helpers/logger");

function UnauthorizedError({code, error, message, debugMessage}) {
  const me = this;
  const constructor = me.constructor;
  Error.captureStackTrace(me, constructor);

  me.name = constructor.name;
  me.message = message;

  logger.log(debugMessage);
  me.code = code;
  me.status = 403;
  me.inner = error;
}
util.inherits(UnauthorizedError, Error);



// ServerError
function ServerError({code, error, message, debugMessage}) {
  const me = this;
  const constructor = me.constructor;
  Error.captureStackTrace(me, constructor);
  me.name = constructor.name;
  me.message = message + (error ? " Message: " + error.message : "");
  me.debugMessage = debugMessage;
  me.code = code;
  me.status = 500;
  me.inner = error;
}
util.inherits(ServerError, Error);

// ClientError
function ClientError({code, error, message, debugMessage}) {
  const me = this;
  const constructor = me.constructor;
  Error.captureStackTrace(me, constructor);
  me.name = constructor.name;
  me.message = message + (error ? " Message: " + error.message : "");
  me.debugMessage = debugMessage;
  me.code = code;
  me.status = 400;
  me.inner = error;
}
util.inherits(ClientError, Error);

module.exports = {
  UnauthorizedError,
  ServerError,
  ClientError
};