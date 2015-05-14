module.exports = function(app) {
  app.dataSources.db.automigrate('Order', function(err) {
    if (err) throw err;

    app.models.Customer.find(function(err, customers) {
      if (err) throw err;

      var orders = [
        {description: 'Order A', total: 200.45, customerId: customers[0].id},
        {description: 'Order B', total: 100,    customerId: customers[0].id},
        {description: 'Order C', total: 350.45, customerId: customers[0].id},
        {description: 'Order D', total: 150.45, customerId: customers[1].id},
        {description: 'Order E', total: 10}
      ];

      var count = orders.length;

      orders.forEach(function(order) {
        app.models.Order.create(order, function(err, instance) {
          if (err)
            return console.log(err);

          console.log('Order created:', instance);

          count--;

          if (count === 0)
            console.log('done');
        });
      });
    });
  });
};
