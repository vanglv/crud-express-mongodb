var express = require('express');
var router = express.Router();


// Require our controllers.
var ProductController = require('../controllers/product.controller');

// PRODUCT ROUTES ///

// GET request for
router.get('/', ProductController.index);  

// GET request for retrieve all Product.
router.get('/products', ProductController.getProducts);

// GET request for retrieve Product follow name
router.get('/products/:id', ProductController.getProduct);

// POST request for creating Product.
router.post('/products', ProductController.addProduct);

// PUT request for update Product.
router.put('/products/:id', ProductController.updateProduct);

// DELETE request for delete Product.
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
