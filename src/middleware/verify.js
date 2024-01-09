const jwt = require('jsonwebtoken');
const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized user');
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const { user } = jwt.verify(token, 'secret');
    console.log(user);
    if (user) {
      const findUser = await userModel.findOne({ email: user.email });
      if (findUser.is_admin) {
        next();
      } else {
        return res.status(400).json({
          status: 404,
          message: 'UnAuthorized user',
        });
      }
    }

    //next();
  } catch (err) {
    console.log('resss', err);
    return res.status(400).json({
      status: 400,
      message: 'Session Expired',
    });
  }
};
const verifyToken = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized user');
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const { user } = jwt.verify(token, 'secret');
    if (user) {
      const findUser = await userModel.findOne({ email: user.email });
      if (findUser) {
        if (findUser.id == userId) next();
      } else {
        return res.status(400).json({
          status: 404,
          message: 'UnAuthorized user',
        });
      }
    }

    //next();
  } catch (err) {
    console.log('resss', err);
    return res.status(400).json({
      status: 400,
      message: 'Session Expired',
    });
  }
};
module.exports = {
  verifyToken,
  verifyAdmin,
};
