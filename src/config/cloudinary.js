const cloudinary = require('cloudinary').v2;
const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: 'post-app',
    api_key: '931523722458625',
    api_secret: 'EevkAvQTQHehYoQ5XaPwkn0pLgE',
  });
};

module.exports = connectCloudinary;
