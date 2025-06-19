const express = require('express');
const router = express.Router();

// Import controllers
const adminController = require('@/controllers/coreControllers/adminController');
const authController = require('@/controllers/middlewaresControllers/createAuthMiddleware');

// Auth routes
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);
router.route('/verify').get(authController.isValidAuthToken);

// Admin routes (protected)
router.use(authController.isValidAuthToken);
router.route('/admin/profile').get(adminController.profile);
router.route('/admin/update').patch(adminController.update);

module.exports = router;