const express = require('express');
const verify = require('../middleware/verify');
const router = express.Router();
const userController = require('../controller/user.controller');
const postController = require('../controller/post.controller');

// verify.verifyToken
//testing
router.delete('/:id', verify.verifyAdmin, userController.deletetUser);
router.get('/:id/posts', verify.verifyAdmin, postController.getPostByUser);
router.get(
  '/:userId/posts/:id',
  verify.verifyAdmin,
  postController.getPostDetailById
);

module.exports = router;
