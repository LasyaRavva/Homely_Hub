const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Property = require('./Models/propertyModel');

// Load environment variables
require('dotenv').config({ path: './config.env' });

// MongoDB connection
const DB = process.env.DATABASE || 'mongodb://127.0.0.1:27017/HomelyHub';

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ DB connection successful!');
}).catch(err => {
  console.error('❌ DB connection failed:', err);
  process.exit(1);
});

// Read JSON file
const properties = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../Database/test.properties.json'), 'utf-8')
);

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await Property.deleteMany();
    console.log('🗑️  Old data deleted');

    // Transform the data to match the schema
    const transformedProperties = properties.map(prop => {
      // Convert MongoDB ObjectId format to string if needed
      const property = { ...prop };
      
      // Remove MongoDB-specific _id field to let Mongoose create new ones
      delete property._id;
      
      // Handle userId if present
      if (property.userId && property.userId.$oid) {
        property.userId = property.userId.$oid;
      }
      
      // Normalize roomType to match schema enum values
      if (property.roomType) {
        const roomTypeMap = {
          'Entire home': 'Entire Home',
          'entire home': 'Entire Home',
          'room': 'Room',
          'anytype': 'Anytype'
        };
        
        if (roomTypeMap[property.roomType]) {
          property.roomType = roomTypeMap[property.roomType];
        }
      }
      
      // Normalize amenity names to match schema enum values
      if (property.amenities && Array.isArray(property.amenities)) {
        property.amenities = property.amenities.map(amenity => {
          // Remove _id field from amenities
          if (amenity._id) delete amenity._id;
          
          // Normalize name values (AC -> Ac, etc.)
          const nameMap = {
            'AC': 'Ac',
            'TV': 'Tv',
            'WIFI': 'Wifi',
            'WiFi': 'Wifi',
            'wifi': 'Wifi',
            'tv': 'Tv',
            'ac': 'Ac'
          };
          
          if (nameMap[amenity.name]) {
            amenity.name = nameMap[amenity.name];
          }
          
          return amenity;
        });
      }
      
      // Remove _id from images if present
      if (property.images && Array.isArray(property.images)) {
        property.images = property.images.map(img => {
          const newImg = { ...img };
          if (newImg._id) delete newImg._id;
          return newImg;
        });
      }
      
      return property;
    });

    // Insert new data
    await Property.create(transformedProperties);
    console.log(`✅ ${transformedProperties.length} properties imported successfully!`);
    
    process.exit();
  } catch (err) {
    console.error('❌ Error importing data:', err);
    process.exit(1);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Property.deleteMany();
    console.log('🗑️  All properties deleted successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error deleting data:', err);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please specify --import or --delete');
  process.exit();
}
