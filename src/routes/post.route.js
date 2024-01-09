const express = require('express');
const Router = express.Router();
const postController = require('../controller/post.controller');
const verify = require('../middleware/verify');
const singleUpload = require('../middleware/upload');

Router.post('/', verify.verifyToken, singleUpload, postController.createPost);
Router.get('/', verify.verifyToken, postController.getAllPosts);
Router.get('/:id', verify.verifyToken, postController.getPostDetailById);
Router.delete('/:id', verify.verifyToken, postController.deletePost);

Router.post('/:id/like/', postController.like);
Router.post('/:id/dislike/', postController.disLike);

module.exports = Router;
