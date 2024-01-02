const mongoose = require('mongoose');

const postScehma = mongoose.Schema({
  post_title: {
    type: String,
    require: true,
  },
  post_description: {
    type: String,
    require: true,
  },
  post_background: {
    type: String,
    require: false,
  },
  post_image: {},
  created_at: {
    type: Date,
    require: Date.now(),
  },
  updated_at: {
    type: Date,
    require: Date.now(),
  },
});

module.exports = mongoose.model('Post', postScehma);
