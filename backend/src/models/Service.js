/**
 * Service.js
 * Mongoose model for service listings offered by micro-entrepreneurs in HunarHub.
 */

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    entrepreneur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Entrepreneur reference is required'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category reference is required'],
    },
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      minlength: [1, 'Service name cannot be empty'],
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true,
      minlength: [1, 'Service description cannot be empty'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      minlength: [1, 'Location cannot be empty'],
    },
    duration: {
      type: String,
      trim: true,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: [0, 'Average rating cannot be less than 0'],
      max: [5, 'Average rating cannot exceed 5'],
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: [0, 'Total reviews cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
serviceSchema.index({ entrepreneur: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ location: 1 });
serviceSchema.index({ isAvailable: 1 });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
