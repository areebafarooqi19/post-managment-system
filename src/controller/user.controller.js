const userModel = require('../model/user.model');
const deletetUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await userModel.deleteOne({ _id: id });

    if (deleteUser.acknowledged && deleteUser.deletedCount > 1) {
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
