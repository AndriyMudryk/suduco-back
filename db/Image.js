const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema({
  name: String,
  type: String,
  data: Buffer
});

module.exports = mongoose.model("Image", Image);