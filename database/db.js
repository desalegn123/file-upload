const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('database mongodb connected successfully');
  } catch (e) {
    console.error('connection of mongodb is failed');
  }
};
module.exports = connectDB;
