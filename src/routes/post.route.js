const express = require('express');
const Router = express.Router();
const postController = require('../controller/post.controller');

const singleUpload = require('../middleware/upload');

Router.post('/', singleUpload, postController.createPost);
module.exports = Router;
