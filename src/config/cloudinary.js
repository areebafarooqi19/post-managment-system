const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
const connectCloudinary = async () => {
  await cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: process.env.SECURE,
  });
};

module.exports = connectCloudinary;
