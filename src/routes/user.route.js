const express = require('express');
const verify = require('../middleware/verify');
const router = express.Router();
const userController = require('../controller/user.controller');

//testing
router.delete('/:id', verify.verifyToken, userController.deletetUser);

module.exports = router;
