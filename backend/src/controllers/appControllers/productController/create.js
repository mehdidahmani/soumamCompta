const Product = require('@/models/appModels/Product');

const create = async (req, res) => {
  try {
    const productData = req.body;

    const product = new Product(productData);
    const savedProduct = await product.save();

    return res.status(200).json({
      success: true,
      result: savedProduct,
      message: 'Product created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = create;