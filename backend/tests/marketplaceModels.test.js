/**
 * marketplaceModels.test.js
 * Unit tests verifying schema constraints, validations, and default values for:
 * - Category
 * - EntrepreneurProfile
 * - Product
 * - Service
 */

const mongoose = require('mongoose');
const Category = require('../src/models/Category');
const EntrepreneurProfile = require('../src/models/EntrepreneurProfile');
const Product = require('../src/models/Product');
const Service = require('../src/models/Service');

describe('Phase 3.6A — Marketplace Domain Models Schema Validation', () => {
  // ── 1. Category Model ─────────────────────────────────────────
  describe('Category Model', () => {
    it('should validate a valid Category object successfully', () => {
      const category = new Category({
        name: 'Handicrafts',
        slug: 'handicrafts',
        description: 'Handmade traditional crafts',
        icon: 'handicraft-icon.png',
        isActive: true,
      });

      const err = category.validateSync();
      expect(err).toBeUndefined();
      expect(category.name).toBe('Handicrafts');
      expect(category.slug).toBe('handicrafts');
      expect(category.isActive).toBe(true);
    });

    it('should fail validation when name is missing', () => {
      const category = new Category({
        slug: 'handicrafts',
      });

      const err = category.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.name).toBeDefined();
    });

    it('should fail validation when slug is missing', () => {
      const category = new Category({
        name: 'Handicrafts',
      });

      const err = category.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.slug).toBeDefined();
    });

    it('should reject empty strings for name and slug', () => {
      const category = new Category({
        name: '   ',
        slug: '   ',
      });

      const err = category.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.slug).toBeDefined();
    });

    it('should ensure slug is trimmed and lowercased by default schema definition', () => {
      const category = new Category({
        name: 'Handicrafts',
        slug: '  HANDICRAFTS-LOCAL  ',
      });

      expect(category.slug).toBe('handicrafts-local');
    });

    it('should have unique index on slug', () => {
      const indexes = Category.schema.indexes();
      const slugIndex = indexes.find(
        ([fields, options]) => fields.slug === 1 && options && options.unique === true
      );
      expect(slugIndex).toBeDefined();
    });
  });

  // ── 2. EntrepreneurProfile Model ──────────────────────────────
  describe('EntrepreneurProfile Model', () => {
    const validUserId = new mongoose.Types.ObjectId();
    const validCategoryId = new mongoose.Types.ObjectId();

    it('should validate a valid EntrepreneurProfile object successfully', () => {
      const profile = new EntrepreneurProfile({
        user: validUserId,
        businessName: 'Hunar Craft Works',
        bio: 'Authentic handcrafted goods directly from artisans',
        phone: '+919876543210',
        location: 'Jaipur, Rajasthan',
        address: '123 Artisan Lane, Old Bazaar',
        skills: ['Pottery', 'Weaving'],
        categories: [validCategoryId],
        profileImage: 'https://example.com/profile.jpg',
        isVerified: false,
        isAvailable: true,
      });

      const err = profile.validateSync();
      expect(err).toBeUndefined();
      expect(profile.businessName).toBe('Hunar Craft Works');
      expect(profile.location).toBe('Jaipur, Rajasthan');
      expect(profile.averageRating).toBe(0);
      expect(profile.totalReviews).toBe(0);
      expect(profile.isAvailable).toBe(true);
      expect(profile.isVerified).toBe(false);
    });

    it('should fail validation when user is missing', () => {
      const profile = new EntrepreneurProfile({
        businessName: 'Hunar Craft Works',
        location: 'Jaipur, Rajasthan',
      });

      const err = profile.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.user).toBeDefined();
    });

    it('should fail validation when businessName is missing', () => {
      const profile = new EntrepreneurProfile({
        user: validUserId,
        location: 'Jaipur, Rajasthan',
      });

      const err = profile.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.businessName).toBeDefined();
    });

    it('should fail validation when location is missing', () => {
      const profile = new EntrepreneurProfile({
        user: validUserId,
        businessName: 'Hunar Craft Works',
      });

      const err = profile.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.location).toBeDefined();
    });

    it('should reject empty strings for businessName and location', () => {
      const profile = new EntrepreneurProfile({
        user: validUserId,
        businessName: '   ',
        location: '   ',
      });

      const err = profile.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.businessName).toBeDefined();
      expect(err.errors.location).toBeDefined();
    });

    it('should enforce rating constraints (0 to 5) and non-negative reviews', () => {
      const negativeRatingProfile = new EntrepreneurProfile({
        user: validUserId,
        businessName: 'Hunar Craft Works',
        location: 'Jaipur',
        averageRating: -1,
        totalReviews: -5,
      });

      const errNeg = negativeRatingProfile.validateSync();
      expect(errNeg).toBeDefined();
      expect(errNeg.errors.averageRating).toBeDefined();
      expect(errNeg.errors.totalReviews).toBeDefined();

      const excessiveRatingProfile = new EntrepreneurProfile({
        user: validUserId,
        businessName: 'Hunar Craft Works',
        location: 'Jaipur',
        averageRating: 5.5,
      });

      const errExcess = excessiveRatingProfile.validateSync();
      expect(errExcess).toBeDefined();
      expect(errExcess.errors.averageRating).toBeDefined();
    });

    it('should define expected indexes for user (unique), location, isVerified, and isAvailable', () => {
      const indexes = EntrepreneurProfile.schema.indexes();
      const userIndex = indexes.find(
        ([fields, options]) => fields.user === 1 && options && options.unique === true
      );
      const locationIndex = indexes.find(([fields]) => fields.location === 1);
      const verifiedIndex = indexes.find(([fields]) => fields.isVerified === 1);
      const availableIndex = indexes.find(([fields]) => fields.isAvailable === 1);

      expect(userIndex).toBeDefined();
      expect(locationIndex).toBeDefined();
      expect(verifiedIndex).toBeDefined();
      expect(availableIndex).toBeDefined();
    });
  });

  // ── 3. Product Model ──────────────────────────────────────────
  describe('Product Model', () => {
    const validUserId = new mongoose.Types.ObjectId();
    const validCategoryId = new mongoose.Types.ObjectId();

    it('should validate a valid Product object successfully', () => {
      const product = new Product({
        entrepreneur: validUserId,
        category: validCategoryId,
        name: 'Terracotta Vase',
        description: 'Handmade clay pottery vase fired with natural glaze',
        price: 499,
        stock: 10,
        images: ['https://example.com/vase1.jpg'],
        location: 'Jaipur',
        isAvailable: true,
      });

      const err = product.validateSync();
      expect(err).toBeUndefined();
      expect(product.name).toBe('Terracotta Vase');
      expect(product.price).toBe(499);
      expect(product.stock).toBe(10);
      expect(product.averageRating).toBe(0);
      expect(product.totalReviews).toBe(0);
      expect(product.isAvailable).toBe(true);
    });

    it('should fail validation when entrepreneur is missing', () => {
      const product = new Product({
        category: validCategoryId,
        name: 'Terracotta Vase',
        description: 'Handmade vase',
        price: 499,
      });

      const err = product.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.entrepreneur).toBeDefined();
    });

    it('should fail validation when category is missing', () => {
      const product = new Product({
        entrepreneur: validUserId,
        name: 'Terracotta Vase',
        description: 'Handmade vase',
        price: 499,
      });

      const err = product.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.category).toBeDefined();
    });

    it('should fail validation when name or description is missing', () => {
      const product = new Product({
        entrepreneur: validUserId,
        category: validCategoryId,
        price: 499,
      });

      const err = product.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.description).toBeDefined();
    });

    it('should reject empty strings for name and description', () => {
      const product = new Product({
        entrepreneur: validUserId,
        category: validCategoryId,
        name: '   ',
        description: '   ',
        price: 499,
      });

      const err = product.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.description).toBeDefined();
    });

    it('should fail validation when price is negative', () => {
      const product = new Product({
        entrepreneur: validUserId,
        category: validCategoryId,
        name: 'Terracotta Vase',
        description: 'Handmade vase',
        price: -50,
      });

      const err = product.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.price).toBeDefined();
    });

    it('should fail validation when stock is negative', () => {
      const product = new Product({
        entrepreneur: validUserId,
        category: validCategoryId,
        name: 'Terracotta Vase',
        description: 'Handmade vase',
        price: 499,
        stock: -2,
      });

      const err = product.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.stock).toBeDefined();
    });

    it('should define expected indexes for entrepreneur, category, location, and isAvailable', () => {
      const indexes = Product.schema.indexes();
      const entrepreneurIndex = indexes.find(([fields]) => fields.entrepreneur === 1);
      const categoryIndex = indexes.find(([fields]) => fields.category === 1);
      const locationIndex = indexes.find(([fields]) => fields.location === 1);
      const availableIndex = indexes.find(([fields]) => fields.isAvailable === 1);

      expect(entrepreneurIndex).toBeDefined();
      expect(categoryIndex).toBeDefined();
      expect(locationIndex).toBeDefined();
      expect(availableIndex).toBeDefined();
    });
  });

  // ── 4. Service Model ──────────────────────────────────────────
  describe('Service Model', () => {
    const validUserId = new mongoose.Types.ObjectId();
    const validCategoryId = new mongoose.Types.ObjectId();

    it('should validate a valid Service object successfully', () => {
      const service = new Service({
        entrepreneur: validUserId,
        category: validCategoryId,
        name: 'Henna & Mehndi Art',
        description: 'Bridal and festive organic henna designs',
        price: 1500,
        location: 'Delhi NCR',
        duration: '2 hours',
        skills: ['Bridal Mehndi', 'Arabic Design'],
        isAvailable: true,
      });

      const err = service.validateSync();
      expect(err).toBeUndefined();
      expect(service.name).toBe('Henna & Mehndi Art');
      expect(service.price).toBe(1500);
      expect(service.location).toBe('Delhi NCR');
      expect(service.duration).toBe('2 hours');
      expect(service.averageRating).toBe(0);
      expect(service.totalReviews).toBe(0);
      expect(service.isAvailable).toBe(true);
    });

    it('should fail validation when entrepreneur is missing', () => {
      const service = new Service({
        category: validCategoryId,
        name: 'Henna Art',
        description: 'Bridal designs',
        price: 1500,
        location: 'Delhi',
      });

      const err = service.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.entrepreneur).toBeDefined();
    });

    it('should fail validation when category is missing', () => {
      const service = new Service({
        entrepreneur: validUserId,
        name: 'Henna Art',
        description: 'Bridal designs',
        price: 1500,
        location: 'Delhi',
      });

      const err = service.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.category).toBeDefined();
    });

    it('should fail validation when name, description, or location is missing', () => {
      const service = new Service({
        entrepreneur: validUserId,
        category: validCategoryId,
        price: 1500,
      });

      const err = service.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.description).toBeDefined();
      expect(err.errors.location).toBeDefined();
    });

    it('should reject empty strings for name, description, and location', () => {
      const service = new Service({
        entrepreneur: validUserId,
        category: validCategoryId,
        name: '   ',
        description: '   ',
        location: '   ',
        price: 1500,
      });

      const err = service.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.description).toBeDefined();
      expect(err.errors.location).toBeDefined();
    });

    it('should fail validation when price is negative', () => {
      const service = new Service({
        entrepreneur: validUserId,
        category: validCategoryId,
        name: 'Henna Art',
        description: 'Bridal designs',
        location: 'Delhi',
        price: -100,
      });

      const err = service.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.price).toBeDefined();
    });

    it('should define expected indexes for entrepreneur, category, location, and isAvailable', () => {
      const indexes = Service.schema.indexes();
      const entrepreneurIndex = indexes.find(([fields]) => fields.entrepreneur === 1);
      const categoryIndex = indexes.find(([fields]) => fields.category === 1);
      const locationIndex = indexes.find(([fields]) => fields.location === 1);
      const availableIndex = indexes.find(([fields]) => fields.isAvailable === 1);

      expect(entrepreneurIndex).toBeDefined();
      expect(categoryIndex).toBeDefined();
      expect(locationIndex).toBeDefined();
      expect(availableIndex).toBeDefined();
    });
  });
});
