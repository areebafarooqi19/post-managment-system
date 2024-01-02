const express = require('express');
const Router = express.Router();
const support = require('../../utils/support');

Router.post('/', support.chatSupport);

module.exports = Router;
