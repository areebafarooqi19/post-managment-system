const mongoose = require('mongoose');

const userScehma = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
  },

  is_admin: {
    type: Boolean,
    require: true,
  },
  created_at: {
    type: Date,
    require: true,
  },
  reset_password_token: {},
  reset_password_expiry_date: {},
});

const userModel = new mongoose.model('users', userScehma);
module.exports = userModel;
