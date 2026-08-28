const User = require("../models/User");
const Property = require("../models/Property");

const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const propertyId = req.params.id;
    // Check property exists
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Find logged-in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if property is already favorite
    const favoriteIndex = user.favorites.findIndex(
      (favorite) => favorite.toString() === propertyId
    );

    if (favoriteIndex !== -1) {
      // Already favorite → remove
      user.favorites.splice(favoriteIndex, 1);

      await user.save();

      return res.status(200).json({
        message: "Property removed from favorites",
        isFavorite: false,
        propertyId,
      });
    }

    // Not favorite → add
    user.favorites.push(propertyId);

    await user.save();

    return res.status(200).json({
      message: "Property added to favorites",
      isFavorite: true,
      propertyId,
    });
  } catch (error) {
    console.error("Toggle favorite error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


const getFavoriteProperties = async (req, res) => {
  try {
 const userId = req.user.userId;
    const user = await User.findById(userId).populate({
      path: "favorites",
      populate: {
        path: "owner",
        select: "name email",
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

return res.status(200).json({
  favorites: user.favorites.map((property) => ({
    ...property.toObject(),
    isFavorite: true,
  })),
});
  } catch (error) {
    console.error("Get favorite properties error:", error);

    return res.status(500).json({
      message: "Failed to get favorite properties",
    });
  }
};

module.exports = {
  toggleFavorite,
  getFavoriteProperties,
};

