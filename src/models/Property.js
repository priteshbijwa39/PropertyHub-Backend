const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    listingType: {
      type: String,
      required: true,
      enum: ["Sale", "Rent", "Lease"],
    },

    propertyCategory: {
      type: String,
      required: true,
      enum: [
        "Residential",
        "Commercial",
        "Land",
        "Hospitality",
      ],
    },

    propertyType: {
      type: String,
      required: true,
      enum: [
        // Residential
        "House",
        "Villa",
        "Apartment",
        "Penthouse",
        "Studio Apartment",
        "Duplex",
        "Builder Floor",
        "Farmhouse",

        // Commercial
        "Shop",
        "Showroom",
        "Office Space",
        "Co-working Space",
        "Warehouse",
        "Industrial Shed",

        // Land
        "Residential Plot",
        "Commercial Land",
        "Agricultural Land",
        "Industrial Land",

        // Hospitality
        "Hotel / Resort",
        "Guest House",
        "Paying Guest",
      ],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    area: {
      type: Number,
      required: true,
      min: 0,
    },

    bedrooms: {
      type: Number,
      min: 0,
    },

    bathrooms: {
      type: Number,
      min: 0,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Property", propertySchema);