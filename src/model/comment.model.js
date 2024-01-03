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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    res: 'user',
  },
});

module.exports = mongoose.model('Comment', commentSchema);
