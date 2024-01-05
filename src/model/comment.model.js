const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    require: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    res: 'user',
  },
  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
