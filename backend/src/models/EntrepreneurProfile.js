/**
 * EntrepreneurProfile.js
 * Mongoose model for micro-entrepreneur profiles in the HunarHub marketplace.
 */

const mongoose = require('mongoose');

const entrepreneurProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
      minlength: [1, 'Business name cannot be empty'],
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      minlength: [1, 'Location cannot be empty'],
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    profileImage: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: false,
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
entrepreneurProfileSchema.index({ location: 1 });
entrepreneurProfileSchema.index({ isVerified: 1 });
entrepreneurProfileSchema.index({ isAvailable: 1 });

const EntrepreneurProfile = mongoose.model('EntrepreneurProfile', entrepreneurProfileSchema);

module.exports = EntrepreneurProfile;
