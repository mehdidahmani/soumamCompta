const Client = require('@/models/appModels/Client');

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findOneAndUpdate(
      { _id: id, removed: false },
      { removed: true, updated: new Date() },
      { new: true }
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
      message: 'Client deleted successfully',
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