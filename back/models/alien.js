const mongoose = require("mongoose");

const alienSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mark: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  series: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Alien", alienSchema);
