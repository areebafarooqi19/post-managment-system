const express = require('express');
const Router = express.Router();
const commentSchema = require('../controller/comment.controller');

Router.post('/', commentSchema.addComment);
Router.delete('/:id', commentSchema.deleteComment);
Router.get('/:postId', commentSchema.getComments);
Router.patch('/:postId', commentSchema.updateComment);

module.exports = Router;
