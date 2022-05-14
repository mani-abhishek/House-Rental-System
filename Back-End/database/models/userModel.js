const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  username: {
    type: String,
    required: [true, "Please Enter Your Password"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "Password must contain minimum 8 character"],
    select: false,
  },

  address: {
    type: String,
    required: [true, "Please Enter Your address"],
  },
  phone: {
    type: String,
    required: [true, "Please Enter Your phone number"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your email"],
    unique: true,
  },

  avatar: {
    public_id: {
      type: String,
      // required: [true, "Please Enter Your Password"],
    },
    public_url: {
      type: String,
      // required: [true, "Please Enter Your Password"],
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE*24*60*60*1000,
    // expiresIn: 1000000,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
