const express = require('express');
const { createProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReviews, getAdminProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), createProduct);

router.get('/products', getAllProducts);

router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);

router.get('/product/:id', getProductDetails)

router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct);

router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.put('/review', isAuthenticatedUser, createProductReview);

router.get('/reviews', getProductReviews);

router.delete('/reviews', isAuthenticatedUser, deleteReviews);

module.exports = router