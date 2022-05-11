const mongoose = require('mongoose');
//MONGODB MONGOOSE SETUP FILE

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `MongoDB Connected Successfully : ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

module.exports = connectDB;
