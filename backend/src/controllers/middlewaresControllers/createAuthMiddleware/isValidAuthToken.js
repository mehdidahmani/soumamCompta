const jwt = require('jsonwebtoken');
const Admin = require('@/models/coreModels/Admin');

const isValidAuthToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        result: null,
        message: 'No token provided',
        jwtExpired: true,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin || admin.removed || !admin.enabled) {
      return res.status(401).json({
        success: false,
        result: null,
        message: 'Invalid token',
        jwtExpired: true,
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      result: null,
      message: 'Invalid token',
      jwtExpired: true,
    });
  }
};

module.exports = isValidAuthToken;