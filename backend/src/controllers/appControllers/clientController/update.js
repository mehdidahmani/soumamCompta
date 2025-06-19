const Client = require('@/models/appModels/Client');

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updated: new Date() };

    const client = await Client.findOneAndUpdate(
      { _id: id, removed: false },
      updateData,
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Client not found',
      });
    }

    return res.status(200).json({
      success: true,
      result: client,
      message: 'Client updated successfully',
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