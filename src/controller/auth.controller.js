const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { sendResetPasswordMail } = require('../../utils/email');
const saltRounds = process.env.HASH_SALT || 10;
const userModel = require('../model/user.model');
const { error } = require('console');
const signUp = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.send({
      status: 404,
      message: 'Missing Required field',
    });
  }
  const hashPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    email,
    password: hashPassword,
    is_admin: false,
    create_at: Date.now(),
  };
  const token = await jwt.sign(
    {
      user,
    },
    'secret',
    { expiresIn: '1h' }
  );

  try {
    const user = await userModel.create(newUser);
    if (user) {
      res.send({
        status: 200,
        message: 'User Created Successfully',
        token,
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error,
    });
  }
};
const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.send({
      status: 404,
      message: 'Missing Required field',
    });
  }
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        const token = await jwt.sign(
          {
            user,
          },
          'secret',
          { expiresIn: '1h' }
        );
        if (token) {
          res.send({
            status: 200,
            message: 'User Login Successfully',
            token,
          });
        }
      } else {
        return res.send({
          status: 404,
          message: 'Password Incoorect',
        });
      }
    } else {
      return res.send({
        status: 404,
        message: 'User not exist',
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: 'User not exist',
    });
  }
};
const signOut = (req, res) => {
  console.log('signOut');
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.send({
      status: 404,
      message: 'Missing Required field',
    });
  }
  const user = await userModel.findOne({ email: email });
  if (user) {
    //token generate
    const resetToken = randomstring.generate(32);

    console.log('====================================', resetToken);
    // const hashToken = crypto
    //   .createHash('sha256')
    //   .update(resetToken)
    //   .digest('hex');
    const resetTokenExpire = Date.now() + 10 * 60 * 1000;

    const updateData = await userModel.updateOne(
      { email: email },
      {
        $set: {
          reset_password_token: resetToken,
          reset_password_expiry_date: resetTokenExpire,
        },
      }
    );
    console.log(updateData);
    try {
      const mailAcknowlege = await sendResetPasswordMail(email, resetToken);
    } catch {
      console.log('error', error);
      try {
        const a = await userModel.updateOne(
          { email: email },
          {
            $set: {
              updated_at: Date.now(),
              reset_password_token: null,
              reset_password_expiry_date: null,
            },
          }
        );
        console.log('done', a);
      } catch (error) {
        console.log(error);
      }
    }
    // if (mailAcknowlege.response.includes("OK")) {

    // }

    console.log(`${req.protocol}//${req.get('host')}/reset-password`);
    //updateData
  } else {
    res.send({
      status: 404,
      message: 'User not exist',
    });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    console.log('Password not match');
    // res.send('Password not match');
  }

  //const hashToken = crypto.createHash('sha256').update(token).digest('hex');
  //console.log('hashtoken', hashToken);
  const user = await userModel.findOne({
    reset_password_token: token,
    // reset_password_expiry_date: { $gt: Date.now() },
  });
  if (!user) {
    console.log('Token is invalid or expires');
  }
  console.log('old ata', user);
  const hashPassword = await bcrypt.hash(password, saltRounds);
  console.log('pnew assowrd', password);
  console.log('new token saved', hashPassword);
  const updateData = await userModel.updateOne(
    { email: user.email },
    {
      $set: {
        password: hashPassword,
        reset_password_token: null,
        updated_at: Date.now(),
        reset_password_expiry_date: null,
      },
    }
  );
  console.log('password updated', updateData);
};

module.exports = {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
};
