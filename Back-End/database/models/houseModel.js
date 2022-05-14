const mongoose = require("mongoose");
const validator = require("validator");

const houseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter house title"],
  },
  address: {
    type: String,
    required: [true, "Please enter Proper Address"],
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Please enterer price"],
    maxlength: [8, "Price cannot exceed 8 character"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  description: {
    type: String,
    required: [true, "Please enter house description"],
  },
  owner_name: {
    type: String,
    required: [true, "Please enter house owner name"],
  },
  features: {
    type: String,
    required: [true, "Please enter some house features"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      public_url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
