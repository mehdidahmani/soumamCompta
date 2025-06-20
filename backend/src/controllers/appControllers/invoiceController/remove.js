const Invoice = require('@/models/appModels/Invoice');

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findOneAndUpdate(
      { _id: id, removed: false },
      { removed: true, updated: new Date() },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Invoice not found',
      });
    }

    return res.status(200).json({
      success: true,
      result: invoice,
      message: 'Invoice deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = remove;