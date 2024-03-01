const mongoose = require("mongoose");

const connection = async () => {
  try {
   await mongoose.connect("mongodb://localhost:27017/user", {});
    console.log("Connection Successful");
  } catch (error) {
    console.log("Connection Failed");
  }
};
connection();
