var Product = require('../models/product');

exports.index = function(req, res, next) {
  res.send('Welcome to API');
}

// Retrieve all products.
exports.getProducts = function(req, res, next) {
  Product.find()
    .sort('price')
    .exec(function (err, products) {
        if (err) { return next(err); }
        res.json({ products });
    })
};

// Product detail.
exports.getProduct = function(req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.send(product);
  })
};

// Add product.
exports.addProduct = function(req, res, next) {
  var product = new Product(
    { 
      name: req.body.name,
      price: req.body.price
    }
  );

  product.save(function (err) {
    if (err) {
        return next(err);
    }
    res.send('Product Created successfully')
  })
};

// Update product.
exports.updateProduct = function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    if (err) return next(err);
    res.send('Product udpated.');
  });
};

// Delete product.
exports.deleteProduct = function (req, res) {
  Product.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Deleted successfully!');
  })
};
