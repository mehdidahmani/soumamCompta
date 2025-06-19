const Admin = require('@/models/coreModels/Admin');

const logout = async (req, res) => {
  try {
    // Update login status
    if (req.admin) {
      await Admin.findByIdAndUpdate(req.admin._id, { 
        isLoggedIn: false,
        updated: new Date()
      });
    }

    // Clear cookie
    res.clearCookie('token');

    return res.status(200).json({
      success: true,
      result: null,
      message: 'Logout successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = logout;