const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var randomstring = require('randomstring');
const { sendResetPasswordMail } = require('../../utils/email');
const userModel = require('../model/user.model');
const { error } = require('console');
const saltRounds = process.env.HASH_SALT || 10;
const SECRET_KEY = process.env.SECRET_KEY;
const signUp = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!(email && password)) {
    return res.send({
      status: 404,
      message: 'Missing Required field',
    });
  }
  const hashPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    first_name,
    last_name,
    email,
    password: hashPassword,
    is_admin: false,
    create_at: Date.now(),
  };
  const token = await jwt.sign(
    {
      user,
    },
    SECRET_KEY,
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
          SECRET_KEY,
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.send({
        status: 404,
        message: 'Missing Required field',
      });
    }

    const user = await userModel.findOne({ email: email });

    if (user) {
      //token generate
      const resetToken = randomstring.generate(32);

      const resetTokenExpire = Date.now() + 10 * 60 * 1000;

      await userModel.updateOne(
        { email: email },
        {
          $set: {
            updated_at: Date.now(),
            reset_password_token: resetToken,
            reset_password_expiry_date: resetTokenExpire,
          },
        }
      );

      try {
        await sendResetPasswordMail(email, resetToken);
        return res.send({
          status: 200,
          message: 'Email send',
        });
      } catch {
        await userModel.updateOne(
          { email: email },
          {
            $set: {
              reset_password_token: null,
              reset_password_expiry_date: null,
            },
          }
        );

        return res.send({
          status: 500,
          message: 'Email not send',
          error,
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
      message: 'Something wents wrong',
      error: error,
    });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.send({
      status: 404,
      message: 'Password not match',
    });
  }
  try {
    const user = await userModel.findOne({
      reset_password_token: token,
    });
    if (!user) {
      return res.send({
        status: 404,
        message: 'Token is invalid',
      });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

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
    res.send({
      status: 200,
      message: 'Password updated',
      user: updateData,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something wents wrong',
      error,
    });
  }
};

module.exports = {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
};
