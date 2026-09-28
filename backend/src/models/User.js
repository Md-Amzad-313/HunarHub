/**
 * User.js
 * Mongoose model for User entities across HunarHub.
 * Supported roles: 'customer', 'entrepreneur', 'admin'.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Ensures password is never returned in default queries
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      enum: {
        values: ['customer', 'entrepreneur', 'admin'],
        message: 'Role must be customer, entrepreneur, or admin',
      },
      default: 'customer',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: Hash password if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method: Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Instance method: Return safe JSON object without sensitive data
userSchema.methods.toSafeObject = function () {
  const obj = this.toObject ? this.toObject() : { ...this };
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
