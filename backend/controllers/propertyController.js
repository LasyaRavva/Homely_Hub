const Property = require('../Models/propertyModel');
const APIFeatures = require('../utils/APIFeatures');

// Get all properties with filtering, searching, and pagination
exports.getProperties = async (req, res) => {
  try {
    const features = new APIFeatures(Property.find(), req.query)
      .search()
      .filter()
      .paginate();
    
    const allProperties = await Property.find();
    const properties = await features.query;
    
    res.status(200).json({
      status: 'success',
      results: properties.length,
      all_properties: allProperties.length,
      data: properties
    });
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get a single property by ID
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        status: 'fail',
        message: 'Property not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: property
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      userId: req.user.id
    };
    
    const newProperty = await Property.create(propertyData);
    
    res.status(201).json({
      status: 'success',
      data: {
        property: newProperty
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get properties for a specific user
exports.getUsersProperties = async (req, res) => {
  try {
    const userId = req.user._id;
    const properties = await Property.find({ userId: userId });
    
    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: properties
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        status: 'fail',
        message: 'Property not found'
      });
    }
    
    // Check if the user owns this property
    if (property.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to update this property'
      });
    }
    
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        property: updatedProperty
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        status: 'fail',
        message: 'Property not found'
      });
    }
    
    // Check if the user owns this property
    if (property.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to delete this property'
      });
    }
    
    await Property.findByIdAndDelete(req.params.id);
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
