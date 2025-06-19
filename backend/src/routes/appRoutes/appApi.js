const express = require('express');
const router = express.Router();

// Import controllers
const invoiceController = require('@/controllers/appControllers/invoiceController');
const clientController = require('@/controllers/appControllers/clientController');
const productController = require('@/controllers/appControllers/productController');

// Import middleware
const { isValidAuthToken } = require('@/controllers/middlewaresControllers/createAuthMiddleware');

// Apply auth middleware to all routes
router.use(isValidAuthToken);

// Invoice routes
router.route('/invoice/create').post(invoiceController.create);
router.route('/invoice/read/:id').get(invoiceController.read);
router.route('/invoice/update/:id').patch(invoiceController.update);
router.route('/invoice/delete/:id').delete(invoiceController.remove);
router.route('/invoice/list').get(invoiceController.paginatedList);
router.route('/invoice/summary').get(invoiceController.summary);

// Client routes
router.route('/client/create').post(clientController.create);
router.route('/client/read/:id').get(clientController.read);
router.route('/client/update/:id').patch(clientController.update);
router.route('/client/delete/:id').delete(clientController.remove);
router.route('/client/list').get(clientController.paginatedList);
router.route('/client/summary').get(clientController.summary);

// Product routes
router.route('/product/create').post(productController.create);
router.route('/product/read/:id').get(productController.read);
router.route('/product/update/:id').patch(productController.update);
router.route('/product/delete/:id').delete(productController.remove);
router.route('/product/list').get(productController.paginatedList);
router.route('/product/summary').get(productController.summary);

module.exports = router;