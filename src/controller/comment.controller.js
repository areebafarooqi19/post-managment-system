const commentModel = require('../model/comment.model');
const postModel = require('../model/post.model');
const userModel = require('../model/user.model');

const addComment = async (req, res) => {
  const { postId, userId } = req.params;
  const { comment } = req.body;
  const postExist = await postModel.findById(postId);
  const userExist = await userModel.findById(userId);
  if (!postExist) return res.status(400).send('Post not found');
  if (!userExist) return res.status(400).send('User not found');
  const newComment = {
    comment,
    userId,
    postId,
  };
  const post = await commentModel.create(newComment);
  if (post) {
    return res.status(201).send(post);
  }
};
const deleteComment = async (res, req) => {
  const { id } = req.params;

  try {
    const deleteComment = await commentModel.deleteOne({ _id: id });

    if (deleteComment.acknowledged && deleteComment.deletedCount > 1) {
      res.send({
        status: 200,
        message: 'Comment deleted Successfully',
      });
    } else {
      res.send({
        status: 400,
        message: 'Comment Not Found',
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error,
    });
  }
};
module.exports = {
  addComment,
  deleteComment,
};
