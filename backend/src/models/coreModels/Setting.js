const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  settingCategory: {
    type: String,
    required: true,
  },
  settingKey: {
    type: String,
    required: true,
    unique: true,
  },
  settingValue: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  valueType: {
    type: String,
    enum: ['string', 'number', 'boolean', 'array', 'object', 'date', 'image'],
    default: 'string',
  },
  isCoreSetting: {
    type: Boolean,
    default: true,
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

module.exports = mongoose.model('Setting', settingSchema);