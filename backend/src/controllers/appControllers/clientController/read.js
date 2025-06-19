const Client = require('@/models/appModels/Client');

const read = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findOne({
      _id: id,
      removed: false,
    });

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
      message: 'Client retrieved successfully',
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