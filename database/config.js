const mongoose = require("mongoose");

// function that allows us to connect to the database
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to database");
  }
};

module.exports = {
  dbConnection,
};
