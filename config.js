/*global process, __dirname*/
const env = process.env;
const mode = env.NODE_ENV || "development";
const projectDir = __dirname;
const config = {
  projectDir: projectDir,
  logDir: "log",
  hostname: "0.0.0.0",
  mode: mode,

  backendPort: parseInt(env.BACKEND_PORT, 10) || 3101,
  tokenNameHeader: env.TOKEN_NAME_HEADER || "Authorization",
  tokenNameCookie: env.TOKEN_NAME_COOKIE || "token",

  ajaxRequestNameHeader: env.AJAX_REQUEST_NAME_HEADER || "X-Requested-With",
  ajaxRequestValueHeader: env.AJAX_REQUEST_VALUE_HEADER || "XMLHttpRequest",

  jwtSecret: env.JWT_SECRET || "noSecret",
  jwtExpires: 60 * 60 * 12,
  db: env.DB
};

module.exports = config;