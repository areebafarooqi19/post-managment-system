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
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  disLikedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('Post', postScehma);
