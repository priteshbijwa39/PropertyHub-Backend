const Property = require("../models/Property");

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
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json({
      message: "Properties fetched successfully",
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// kisi user ki property ko dekhna he
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      message: "Property fetched successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// update property by id
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Sirf property ka owner update kar sakta hai
    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this property",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// delete property by id
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Sirf owner property delete kar sakta hai
    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this property",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
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
