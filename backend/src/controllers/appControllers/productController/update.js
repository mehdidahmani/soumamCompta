const Product = require('@/models/appModels/Product');

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updated: new Date() };

    const product = await Product.findOneAndUpdate(
      { _id: id, removed: false },
      updateData,
      { new: true, runValidators: true }
    );

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
      message: 'Product updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = update;