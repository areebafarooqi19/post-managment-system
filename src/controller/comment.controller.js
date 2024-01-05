const commentModel = require('../model/comment.model');
const postModel = require('../model/post.model');
const userModel = require('../model/user.model');

const addComment = async (req, res) => {
  const { postId, userId } = req.body;
  const { comment } = req.body;
  const postExist = await postModel.findById(postId);
  const userExist = await userModel.findById(userId);
  if (!postExist) return res.status(400).send('Post not found');
  if (!userExist) return res.status(400).send('User not found');
  const newComment = {
    comment,
    created_by: userId,
    postId,
    created_at: Date.now(),
  };
  const post = await commentModel.create(newComment);
  if (post) {
    return res.status(201).send(post);
  }
};
const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteComment = await commentModel.deleteOne({ _id: id });

    if (deleteComment.acknowledged && deleteComment.deletedCount > 1) {
      return res.send({
        status: 200,
        message: 'Comment deleted Successfully',
      });
    } else {
      return res.send({
        status: 400,
        message: 'Comment Not Found',
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
const getComments = async (req, res) => {
  const { postId } = req.params;
  const comment = await commentModel.find({ postId });
  if (comment) {
    return res.status(201).send(comment);
  }
  return res.status(400).send('There is no comment');
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const updatedComment = await commentModel.updateOne(
    { id },
    {
      $set: {
        comment,
      },
    }
  );
  if (updatedComment.acknowledged && updatedComment.modifiedCount > 0) {
    return res.status(201).status('Comment Successfully updated');
  }
  return res.status(400).status('Comment updation Failed');
};

module.exports = {
  addComment,
  deleteComment,
  getComments,
  updateComment,
};
