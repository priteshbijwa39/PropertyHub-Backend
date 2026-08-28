const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);