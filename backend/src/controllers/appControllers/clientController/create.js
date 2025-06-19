const Client = require('@/models/appModels/Client');

const create = async (req, res) => {
  try {
    const clientData = req.body;

    const client = new Client(clientData);
    const savedClient = await client.save();

    return res.status(200).json({
      success: true,
      result: savedClient,
      message: 'Client created successfully',
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