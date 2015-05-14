module.exports = function(app) {
  app.dataSources.db.automigrate('Review', function(err) {
    if (err) throw err;

    app.models.Customer.find(function(err, customers) {
      if (err) throw err;

      var reviews = [
        {product: 'Product1', star: 3, authorId: customers[0].id},
        {product: 'Product2', star: 2, authorId: customers[1].id},
        {product: 'Product5', star: 5}
      ];

      var count = reviews.length;

      reviews.forEach(function(review) {
        app.models.Review.create(review, function(err, instance) {
          if (err)
            return console.log(err);

          console.log('Review created:', instance);

          count--;

          if (count === 0)
            console.log('done');
        });
      });
    });
  });
};
