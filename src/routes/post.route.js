const express = require('express');
const Router = express.Router();
const postController = require('../controller/post.controller');

const singleUpload = require('../middleware/upload');

Router.post('/', singleUpload, postController.createPost);
Router.get('/', postController.getAllPosts);
Router.get('/:id', postController.getPostDetailById);
Router.delete('/:id', postController.deletePost);

Router.post('/:id/like/', postController.like);
Router.post('/:id/dislike/', postController.disLike);

module.exports = Router;
