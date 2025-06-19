const Invoice = require('@/models/appModels/Invoice');

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { items = [], taxRate = 0, discount = 0, ...otherData } = req.body;

    // Process items and calculate totals
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

    const subTotal = processedItems.reduce((sum, item) => sum + item.total, 0);
    const taxTotal = (subTotal * Number(taxRate)) / 100;
    const total = subTotal + taxTotal - Number(discount);

    const updateData = {
      ...otherData,
      items: processedItems,
      taxRate: Number(taxRate),
      discount: Number(discount),
      subTotal,
      taxTotal,
      total,
      updated: new Date(),
    };

    const invoice = await Invoice.findOneAndUpdate(
      { _id: id, removed: false },
      updateData,
      { new: true, runValidators: true }
    ).populate('client');

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
      message: 'Invoice updated successfully',
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