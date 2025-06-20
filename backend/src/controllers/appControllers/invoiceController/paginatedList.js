const Invoice = require('@/models/appModels/Invoice');

const paginatedList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.items) || 10;
    const skip = (page - 1) * limit;

    const { sort = 'desc', sortBy = 'created' } = req.query;
    const sortOrder = sort === 'desc' ? -1 : 1;

    const invoices = await Invoice.find({ removed: false })
      .populate('client')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Invoice.countDocuments({ removed: false });
    const pages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      result: invoices,
      pagination: {
        page,
        pages,
        count: invoices.length,
        total,
      },
      message: 'Invoices retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = paginatedList;