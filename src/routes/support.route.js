const express = require('express');
const Router = express.Router();
const support = require('../../utils/support');
const { verifyAdmin } = require('../middleware/verify');

Router.post('/', verifyAdmin, support.chatSupport);

module.exports = Router;
