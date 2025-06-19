const Product = require('@/models/appModels/Product');

const paginatedList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.items) || 10;
    const skip = (page - 1) * limit;

    const { sort = 'desc', sortBy = 'created' } = req.query;
    const sortOrder = sort === 'desc' ? -1 : 1;

    const products = await Product.find({ removed: false })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments({ removed: false });
    const pages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      result: products,
      pagination: {
        page,
        pages,
        count: products.length,
        total,
      },
      message: 'Products retrieved successfully',
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