const Admin = require('@/models/coreModels/Admin');

const profile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Admin not found',
      });
    }

    return res.status(200).json({
      success: true,
      result: admin,
      message: 'Profile retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.admin;
    const updateData = { ...req.body, updated: new Date() };
    
    // Remove password from update data if present
    delete updateData.password;

    const admin = await Admin.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Admin not found',
      });
    }

    return res.status(200).json({
      success: true,
      result: admin,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = {
  profile,
  update,
};