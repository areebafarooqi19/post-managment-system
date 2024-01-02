const nodemailer = require('nodemailer');
const sendResetPasswordMail = async (email, token) => {
  console.log(process.env.USER_EMAIL);
  try {
    const smtpConfig = {
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,

      auth: {
        user: 'areebafarooqi19@gmail.com',
        pass: 'vzog wheh wgov kvuq',
      },
      // auth: {
      //   // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      //   user: 'areebafarooqi1998@gmail.com',
      //   pass: 'hamza0404',
      // },
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    const resetLink = `http://localhost:5000/reset-password/${token}`;
    const mailOption = {
      from: 'areebafarooqi19@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: `<p> Hi, Please click this link and</p> <a href=${resetLink}>Reset Your Password</a>`,
    };

    return await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  sendResetPasswordMail,
};
