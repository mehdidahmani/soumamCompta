const Client = require('@/models/appModels/Client');

const summary = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments({ removed: false });
    const activeClients = await Client.countDocuments({ removed: false, status: 'active' });
    const inactiveClients = await Client.countDocuments({ removed: false, status: 'inactive' });

    return res.status(200).json({
      success: true,
      result: {
        totalClients,
        activeClients,
        inactiveClients,
      },
      message: 'Client summary retrieved successfully',
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