const express = require('express');
const Router = express.Router();
const commentSchema = require('../controller/comment.controller');

Router.post('/:postId/:userId', commentSchema.addComment);
Router.delete('/:id', commentSchema.deleteComment);

module.exports = Router;
