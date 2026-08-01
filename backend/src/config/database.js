const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("");
    console.log("=================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log("=================================");
    console.log("");

  } catch (error) {

    console.error("");
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDatabase;