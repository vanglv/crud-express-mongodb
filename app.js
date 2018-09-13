var express = require('express');
var bodyParser = require('body-parser');

var product = require('./routes/product.routes');

// Create the Express application object
var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', product);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = 8080;

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
