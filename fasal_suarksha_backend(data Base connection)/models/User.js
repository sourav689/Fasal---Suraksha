const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true, // Mandatory during language selection
  },
  selectedLanguage: {
    type: String,
    required: true, // Mandatory during language selection
  },
  name: {
    type: String,
    required: false, // Mandatory only during signup
  },
  mobile: {
    type: String,
    required: false, // Mandatory only during signup
    unique: true, // Ensures phone number is unique
  },
  otp: {
    type: String,
    required: false, // Optional during signup
  },
  username: {
    type: String,
    required: false, // Mandatory only during signup
    unique: true, // Ensures username is unique
  },
  password: {
    type: String,
    required: false, // Mandatory only during signup
  },
  kissanID: {
    type: String,
    required: false, // Optional field for future use
  },
});

UserSchema.methods.comparePassword = function (password) {
  return password === this.password; // Directly compare plain text passwords
};
module.exports = mongoose.model("User", UserSchema);
