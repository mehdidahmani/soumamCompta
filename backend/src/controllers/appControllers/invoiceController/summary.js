const Invoice = require('@/models/appModels/Invoice');

const summary = async (req, res) => {
  try {
    const totalInvoices = await Invoice.countDocuments({ removed: false });
    const totalAmount = await Invoice.aggregate([
      { $match: { removed: false } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const paidAmount = await Invoice.aggregate([
      { $match: { removed: false, paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const unpaidAmount = await Invoice.aggregate([
      { $match: { removed: false, paymentStatus: 'unpaid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    return res.status(200).json({
      success: true,
      result: {
        totalInvoices,
        totalAmount: totalAmount[0]?.total || 0,
        paidAmount: paidAmount[0]?.total || 0,
        unpaidAmount: unpaidAmount[0]?.total || 0,
      },
      message: 'Invoice summary retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = summary;