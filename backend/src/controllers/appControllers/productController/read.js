const Product = require('@/models/appModels/Product');

const read = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      _id: id,
      removed: false,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      result: product,
      message: 'Product retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = read;