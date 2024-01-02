const mongoose = require('mongoose');

const authScehma = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

modeule.exports = mongoose.model('User', authScehma);
