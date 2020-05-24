const jwt = require("jsonwebtoken"); // Used to create, sign, and verify jwt tokens
const bcrypt = require("bcryptjs");// Used for cryptic operations

const rootPath = "../";
const utils = require(rootPath + "helpers/utils.js");
const logger = require(rootPath + "helpers/logger");
const db = require(rootPath + "db");
const config = require(rootPath + "config");
const validator = require(rootPath + "helpers/validators");
const { UnauthorizedError } = require(rootPath + "helpers/Errors");

const jwtSecret = config.jwtSecret;
const jwtExpires = config.jwtExpires;

function checkUserLoginData(userDbData) {
  let errors = {};
  if (typeof userDbData !== "object") {
    errors.customError = "Empty userDbData object.";
    return errors;
  }
  let errorMessage = validator.isEmail(userDbData.email);
  if (errorMessage !== null) {
    errors.email = errorMessage;
  }
  errorMessage = validator.isString(userDbData.password);
  if (errorMessage !== null) {
    errors.password = errorMessage || "This field is required as not empty string."; 
  }
  return errors;
}

function getToken(userLoginData) {
  const checkResult = checkUserLoginData(userLoginData);

  if (!utils.isEmptyObject(checkResult)) {
    checkResult.isFieldsError = true;
    logger.error("[User] Error in getToken method. Wrong user data.");
    logger.error("[User] Data: " + JSON.stringify(userLoginData, null, 4));
    logger.error("[User] Check results: " + JSON.stringify(checkResult, null, 4));
    return Promise.reject(
      new UnauthorizedError(
        {
          code: "invalid_user_data",
          message: "The credentials provided are not valid",
          errors: checkResult,
          debugMessage: "[User] getToken: Error in checkResult. Details: Invalid user login data."
        }
      )
    );
  }

  const email = userLoginData.email;
  const password = userLoginData.password;
  const ip = userLoginData.ip;
  return db.User.findOne({email: email}, "email password").exec().then(
    function (userDbData) {
      // Check user existence
      if (!userDbData) {
        throw new UnauthorizedError(
          {
            code: "invalid_user",
            message: "Invalid user email.",
            debugMessage: "[User] getToken: Details: User with email `" + email + "` not found."
          }
        );
      }

      // Check password
      if (!bcrypt.compareSync(password, userDbData.password)) {
        throw new UnauthorizedError(
          {
            code: "invalid_password",
            message: "Wrong user password.",
            debugMessage: "[User] getToken: Invalid password for user `" + email + "`."
          }
        );
      }

      const payloadObject = {
        ip: ip,
        id: userDbData._id,
        email: userDbData.email
      };

      const accessToken = jwt.sign(payloadObject, Buffer.from(jwtSecret, "base64"), {
        expiresIn: jwtExpires,
        algorithm: "HS256"
      });
      logger.log("[authentification] JWT: Success user login `" + email + "`; accessToken = `" + accessToken + "`. User details: " + JSON.stringify(userDbData));

      return {
        jwt: accessToken
      };
    }
  );
}

function createUser(userData) {
  const checkResult = checkUserLoginData(userData);

  if (!utils.isEmptyObject(checkResult)) {
    checkResult.isFieldsError = true;
    logger.error("[User] Error in createUser method. Wrong user data.");
    logger.error("[User] Data: " + JSON.stringify(userData, null, 4));
    logger.error("[User] Check results: " + JSON.stringify(userData, null, 4));
    return Promise.reject(
      new UnauthorizedError(
        {
          code: "invalid_user_data",
          message: "The data are not valid",
          errors: checkResult,
          debugMessage: "[User] getToken: Error in checkResult. Details: Invalid user register data."
        }
      )
    );
  }

  const passHash = bcrypt.hashSync(userData.password, 8);

  return db.User.create({
    email: userData.email,
    password: passHash
  });
}

function getCurrentUserInfo(request) {
  const accessToken = utils.getTokenFromRequest(request);
  let payloadObject = null;
  try {
    payloadObject = jwt.verify(accessToken, Buffer.from(jwtSecret, "base64"), {
      algorithms: ["HS256"]
    });
  } catch (error) {
    return Promise.reject(
      new UnauthorizedError(
        {
          code: "invalid_authorization",
          message: "Invalid user authorization.",
          error: error,
          debugMessage: "[User] getCurrentUserInfo: Details: Error in verifying jwt token"
        }
      )
    );
  }
  return db.User.findOne({_id: payloadObject.id}, "email").exec();
}

module.exports = {
  getToken: getToken,
  createUser: createUser,
  getCurrentUserInfo: getCurrentUserInfo
};