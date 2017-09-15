module.exports = function(app) {
  var Customer = app.models.Customer;
  Customer.nestRemoting('orders');
};