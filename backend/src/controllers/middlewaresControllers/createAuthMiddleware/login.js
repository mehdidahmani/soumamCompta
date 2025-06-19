const jwt = require('jsonwebtoken');
const Admin = require('@/models/coreModels/Admin');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Email and password are required',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase(), removed: false });

    if (!admin || !admin.enabled) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Invalid credentials',
      });
    }

    const isPasswordValid = await admin.correctPassword(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );

    // Update login status
    await Admin.findByIdAndUpdate(admin._id, { 
      isLoggedIn: true,
      updated: new Date()
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const adminData = {
      _id: admin._id,
      name: admin.name,
      surname: admin.surname,
      email: admin.email,
      role: admin.role,
      photo: admin.photo,
    };

    return res.status(200).json({
      success: true,
      result: adminData,
      message: 'Login successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = login;