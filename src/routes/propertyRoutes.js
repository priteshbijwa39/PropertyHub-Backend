const express = require('express');
const { createProperty,getAllProperties, getPropertyById, updateProperty,deleteProperty } = require('../controllers/propertyController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();
// after token varify user can create property route
router.post('/', protect, createProperty);
// for get property details
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
// for update property
router.put('/:id', protect, updateProperty);
// for delete property
router.delete('/:id', protect, deleteProperty);

module.exports = router;