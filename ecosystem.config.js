const packageJson = require("./package.json");

const APP = {
  VERSION: packageJson.version,
  NAME: packageJson.name,
  DESCRIPTION: packageJson.description,
};

const env_develop = {
  NODE_ENV: "development",
  BACKEND_PORT: 3101,

  TOKEN_NAME_HEADER: "Authorization",
  TOKEN_NAME_COOKIE: "token",
  AJAX_REQUEST_NAME_HEADER: "X-Requested-With",
  AJAX_REQUEST_VALUE_HEADER: "XMLHttpRequest",

  JWT_SECRET: "noSecret",
  DB: "mongodb+srv://user:mongoPassword@cluster0-dz0gn.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true"
};

module.exports = {

  apps: [{
    name: "suduco-dev",
    script: "./index.js",
    env: env_develop,
    watch: "./",
    ignore_watch: ["node_modules", "./log/*", ".gitignore"]
  }],
};