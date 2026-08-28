const mongoose = require("mongoose");
const Property = require("../models/Property");
const User = require("../models/User");

// Create property
const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner: req.user.userId,
    });

    res.status(201).json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.error("Create property error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid property data",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    let favoriteIds = [];

    if (req.user?.userId) {
      const user = await User.findById(req.user.userId).select("favorites");
      if (user) {
        favoriteIds = user.favorites.map((id) => id.toString());
      }
    }
    const propertiesWithFavorite = properties.map((property) => ({
      ...property.toObject(),
      isFavorite: favoriteIds.includes(property._id.toString()),
    }));
    res.status(200).json({
      message: "Properties fetched successfully",
      properties: propertiesWithFavorite,
    });
  } catch (error) {
    console.error("Get all properties error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email mobileNumber",
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }
    let isFavorite = false;

    if (req.user?.userId) {
      const user = await User.findById(req.user.userId).select("favorites");

      if (user) {
        isFavorite = user.favorites.some(
          (id) => id.toString() === property._id.toString(),
        );
      }
    }
    res.status(200).json({
      message: "Property fetched successfully",
      property: {
        ...property.toObject(),
        isFavorite,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update property by ID
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Only property owner can update property
    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this property",
      });
    }

     // Prevent owner from being changed
    const { owner, ...propertyData } = req.body;

    const updatedProperty = await Property.findByIdAndUpdate(id, 
      {
        ...propertyData,
        owner: property.owner,
      }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Update property error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid property data",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
  // Mongoose cast error
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid property data",
      });
    }
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete property by ID
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Only property owner can delete property
    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this property",
      });
    }

    await Property.findByIdAndDelete(id);

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
