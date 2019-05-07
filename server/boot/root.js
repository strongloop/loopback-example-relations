// Copyright IBM Corp. 2015,2017. All Rights Reserved.
// Node module: loopback-example-relations
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(app) {
	var router = app.loopback.Router();
	router.get('/', function(req, res, next) {
		app.models.Customer.findOne({
			where: {
				name: 'Customer A'
			}}, function(err, customer) {
				if (err) return next(err);
				res.render('index', {customer: customer});
			});
	});
	router.get('/email', function(req, res, next) {
		app.models.Customer.findOne({
			where: {
				name: 'Larry Smith'
		    }}, function(err, customer) {
			    if (err) return next(err);
			    res.render('email', {customer: customer}); 
		});
	});
	router.get('/address', function(req, res, next) {
		app.models.Customer.findOne({
			where: {
				name: 'John Smith'
		    }}, function(err, customer) {
			    if (err) return next(err);
			    res.render('address', {customer: customer}); 
		});
	});
    router.get('/account', function(req, res, next) {
		app.models.Customer.findOne({
			where: {
				name: 'Mary Smith'
		    }}, function(err, customer) {
			    if (err) return next(err);
			    res.render('account', {customer: customer}); 
		});
	});
	app.use(router);
};
