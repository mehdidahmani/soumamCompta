const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  recurring: {
    type: String,
    default: 'never',
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiredDate: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true,
    autopopulate: true,
  },
  items: [
    {
      itemName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  taxRate: {
    type: Number,
    default: 0,
  },
  subTotal: {
    type: Number,
    default: 0,
  },
  taxTotal: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    uppercase: true,
    default: 'USD',
  },
  paymentStatus: {
    type: String,
    default: 'unpaid',
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'sent', 'received', 'refund', 'cancelled', 'on hold'],
    default: 'draft',
  },
  notes: {
    type: String,
  },
  pdf: {
    type: String,
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

// Add plugin for autopopulate
invoiceSchema.plugin(require('mongoose-autopopulate'));

// Pre-save middleware to calculate totals
invoiceSchema.pre('save', function (next) {
  // Calculate subTotal
  this.subTotal = this.items.reduce((sum, item) => sum + item.total, 0);
  
  // Calculate tax
  this.taxTotal = (this.subTotal * this.taxRate) / 100;
  
  // Calculate total
  this.total = this.subTotal + this.taxTotal - this.discount;
  
  // Update timestamp
  this.updated = Date.now();
  
  next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);