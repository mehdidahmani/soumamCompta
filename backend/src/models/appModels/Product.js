const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  itemName: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    uppercase: true,
    default: 'USD',
  },
  taxRate: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    trim: true,
    default: 'unit',
  },
  sku: {
    type: String,
    trim: true,
  },
  barcode: {
    type: String,
    trim: true,
  },
  images: [
    {
      type: String,
      trim: true,
    },
  ],
  inventory: {
    quantity: {
      type: Number,
      default: 0,
    },
    minQuantity: {
      type: Number,
      default: 0,
    },
    trackQuantity: {
      type: Boolean,
      default: false,
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);