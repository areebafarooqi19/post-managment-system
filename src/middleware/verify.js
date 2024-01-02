const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  console.log('hhhhhhhhhhhhhhhhhhhh');
  try {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized user');
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const { user } = jwt.verify(token, 'secret');
    console.log(user);
    if (user) {
      if (!user.is_amin) {
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

module.exports = {
  verifyToken,
};
