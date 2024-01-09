const express = require('express');
const authController = require('../controller/auth.controller');
const router = express.Router();

//testing
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;
