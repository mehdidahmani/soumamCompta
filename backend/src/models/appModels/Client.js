const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    enum: ['people', 'company'],
    required: true,
    default: 'company',
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  birthday: Date,
  birthplace: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  fax: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  zipcode: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  managerSurname: {
    type: String,
    trim: true,
  },
  managerName: {
    type: String,
    trim: true,
  },
  taxNumber: {
    type: String,
    trim: true,
  },
  registrationNumber: {
    type: String,
    trim: true,
  },
  bankAccount: {
    type: String,
    trim: true,
  },
  paymentTerms: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  source: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    default: 'active',
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

module.exports = mongoose.model('Client', clientSchema);