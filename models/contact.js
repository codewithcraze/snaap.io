const mongoose = require('mongoose');

// Define a subscriber schema
const contactSchema = new mongoose.Schema(
  {
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      // Email validation regex
    },
    message: {
        type: String,
        required: true,
    },
    subscribe: {
        type: Boolean,
        default: true,
    }
  },
  {
    timestamps: true, 
  }
);

// Create a model based on the schema
const Contact = mongoose.model('contact', contactSchema);
module.exports = { Contact };
