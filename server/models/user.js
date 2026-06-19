const mongoose = require("mongoose");

const savedCodeSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // ADD THESE FIELDS FOR OTP PASSWORD RESET
  resetOTP: {
    type: String,
    default: null,
  },
  resetOTPExpires: {
    type: Date,
    default: null,
  },

  // ⭐ NEW FIELD
  savedCodes: [savedCodeSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
