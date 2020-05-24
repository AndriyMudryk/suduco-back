const mongoose = require('mongoose');
const config = require('../config');
const Image = require('./Image');
const User = require('./User');

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = {
  mongoose,
  Image,
  User
}
