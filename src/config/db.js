const mongoose = require('mongoose');
const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(`ERROR:${error}`);
  }
};

module.exports = connectDb;
