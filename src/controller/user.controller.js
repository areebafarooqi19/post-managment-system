const commentModel = require('../model/comment.model');
const postModel = require('../model/post.model');
const userModel = require('../model/user.model');
const deletetUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await userModel.deleteOne({ _id: id });
    console.log(deleteUser);
    await postModel.deleteMany({
      likedBy: id,
      $pull: { likedBy: id },
    });

    if (deleteUser?.acknowledged && deleteUser?.deletedCount >= 1) {
      await commentModel.deleteMany({ userId: id });
      res.send({
        status: 200,
        message: 'User deleted Successfully',
      });
    } else {
      res.send({
        status: 400,
        message: 'User Not Found',
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
  deletetUser,
};
