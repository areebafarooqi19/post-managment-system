const express = require('express');
const Router = express.Router();
const postController = require('../controller/post.controller');

const singleUpload = require('../middleware/upload');

Router.post('/', singleUpload, postController.createPost);
Router.post('/like/:postId/:userId', postController.like);
Router.post('/dislike/:postId/:userId', postController.disLike);

module.exports = Router;
