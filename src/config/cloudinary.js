const cloudinary = require('cloudinary');
const connectCloudinary = async () => {
  await cloudinary.v2.config({
    cloud_name: 'dr0irtvmr',
    api_key: '931523722458625',
    api_secret: 'EevkAvQTQHehYoQ5XaPwkn0pLgE',
    secure: true,
  });
  console.log('n');
};

module.exports = connectCloudinary;
