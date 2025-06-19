const Product = require('@/models/appModels/Product');

const summary = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ removed: false });
    const enabledProducts = await Product.countDocuments({ removed: false, enabled: true });
    const disabledProducts = await Product.countDocuments({ removed: false, enabled: false });

    return res.status(200).json({
      success: true,
      result: {
        totalProducts,
        enabledProducts,
        disabledProducts,
      },
      message: 'Product summary retrieved successfully',
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