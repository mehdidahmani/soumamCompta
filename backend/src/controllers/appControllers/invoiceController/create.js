const mongoose = require('mongoose');
const Invoice = require('@/models/appModels/Invoice');
const Client = require('@/models/appModels/Client');
const { increaseBySettingKey } = require('@/middlewares/settings');

const create = async (req, res) => {
  try {
    const { items = [], client, taxRate = 0, discount = 0, ...otherData } = req.body;

    // Validate required fields
    if (!client) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Client is required',
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'At least one item is required',
      });
    }

    // Validate client ID
    if (!mongoose.Types.ObjectId.isValid(client)) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Invalid client ID',
      });
    }

    // Check if client exists
    const clientExists = await Client.findOne({ _id: client, removed: false });
    if (!clientExists) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Client not found',
      });
    }

    // Validate admin
    if (!req.admin || !req.admin._id) {
      return res.status(401).json({
        success: false,
        result: null,
        message: 'Authentication required',
      });
    }

    // Calculate item totals
    const processedItems = items.map(item => {
      const quantity = Number(item.quantity) || 1;
      const price = Number(item.price) || 0;
      const total = quantity * price;

      return {
        itemName: item.itemName || '',
        description: item.description || '',
        quantity,
        price,
        total,
      };
    });

    // Calculate totals
    const subTotal = processedItems.reduce((sum, item) => sum + item.total, 0);
    const taxTotal = (subTotal * Number(taxRate)) / 100;
    const total = subTotal + taxTotal - Number(discount);

    // Get next invoice number
    const currentYear = new Date().getFullYear();
    let lastNumber = 1;
    
    try {
      const { settingValue } = await increaseBySettingKey({
        settingKey: 'last_invoice_number',
      });
      lastNumber = settingValue;
    } catch (settingError) {
      console.warn('Could not get invoice number from settings, using default:', settingError.message);
      // Try to get the highest existing invoice number
      const lastInvoice = await Invoice.findOne({ year: currentYear })
        .sort({ number: -1 })
        .select('number');
      lastNumber = lastInvoice ? lastInvoice.number + 1 : 1;
    }

    // Create invoice data
    const invoiceData = {
      ...otherData,
      createdBy: req.admin._id,
      client: client,
      items: processedItems,
      number: lastNumber,
      year: currentYear,
      taxRate: Number(taxRate),
      discount: Number(discount),
      subTotal,
      taxTotal,
      total,
      date: otherData.date || new Date(),
      expiredDate: otherData.expiredDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: otherData.status || 'draft',
      paymentStatus: otherData.paymentStatus || 'unpaid',
    };

    // Create and save invoice
    const invoice = new Invoice(invoiceData);
    const savedInvoice = await invoice.save();

    // Populate client data
    await savedInvoice.populate('client');

    return res.status(200).json({
      success: true,
      result: savedInvoice,
      message: 'Invoice created successfully',
    });

  } catch (error) {
    console.error('Invoice creation error:', error);
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message || 'Error creating invoice',
    });
  }
};

module.exports = create;