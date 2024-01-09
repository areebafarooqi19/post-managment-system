const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
//configDotenv;
const sendResetPasswordMail = async (email, token) => {
  try {
    const smtpConfig = {
      service: processs.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_POST,

      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    };

    var transporter = nodemailer.createTransport(smtpConfig);
    const resetLink = `${req.protocol}//${req.get(
      'host'
    )}/reset-password/${token}`;
    const mailOption = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: 'Reset Password',
      html: `Hi, Please click this link and <a href=${resetLink}>Reset Your Password</a>`,
    };

    return await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error, error);
    return error;
  }
};
module.exports = {
  sendResetPasswordMail,
};
