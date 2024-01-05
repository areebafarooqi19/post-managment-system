const express = require('express');
const verify = require('../middleware/verify');
const router = express.Router();
const userController = require('../controller/user.controller');
const postController = require('../controller/post.controller');

// verify.verifyToken
//testing
router.delete('/:id', userController.deletetUser);
router.get('/:id/posts', postController.getPostByUser);
router.get('/:userId/posts/:id', postController.getPostDetailById);

module.exports = router;
