const express = require('express');
const propertyController = require('../controllers/propertyController');
const authController = require('../controllers/authController');

const router = express.Router();

// GET all properties - /api/v1/rent/listing
router.get('/', propertyController.getProperties);

// GET single property by ID - /api/v1/rent/listing/:id
router.get('/:id', propertyController.getProperty);

// POST create new property (requires authentication)
router.post('/', authController.protect, propertyController.createProperty);

// PATCH update property (requires authentication)
router.patch('/:id', authController.protect, propertyController.updateProperty);

// DELETE property (requires authentication)
router.delete('/:id', authController.protect, propertyController.deleteProperty);

// GET user's properties (requires authentication)
router.get('/user/properties', authController.protect, propertyController.getUsersProperties);

module.exports = router;
