'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Product = mongoose.model('Product'),
	Category = mongoose.model('Category');


/**
 * Globals
 */
//var user, products;

/**
 * Unit tests
 */
describe('Product Test Model:', function() {
	describe('Saving', function() {
		it('saves new product', function(done) {
			var category = new Category({
					name: 'Beverages',
					description: 'Soft drinks, coffees, teas, beers, and ales'
			});

			var product = new Product({
				category: category.id,
				name: 'Blue Moon',
				quantityPerUnit: '6',
				unitPrice: '10',
				unitsInStock: '100',
			});

			product.save(function(err, saved) {
				should.not.exist(err);
				done();
			});
		});


		it('throws validation error when name is empty', function(done) {
				var category = new Category({
						name: 'Beverages',
						description: 'Soft drinks, coffees, teas, beers, and ales'
				});

				var product = new Product({
					category: category.id,
					quantityPerUnit: '6',
					unitPrice: '10',
					unitsInStock: '100',
				});

				product.save(function(err) {
						should.exist(err);
						err.errors.name.message.should.equal('name cannot be blank');
						done();
				});
		});

		it('throws validation error when name longer than 40 chars', function(done) {
				var category = new Category({
						name: 'Beverages',
						description: 'Soft drinks, coffees, teas, beers, and ales'
				});

				var product = new Product({
					category: category.id,
					name: 'This is a very long name it should be longer than 40 characters so that it breaks mongoose but doesnt because we are checking for errors! yay!',
					quantityPerUnit: '6',
					unitPrice: '10',
					unitsInStock: '100',
				});

				product.save(function(err) {
						should.exist(err);
						err.errors.name.message.should.equal('name must be 40 characters in length or less');
						done();
				});
		});

		it('throws validation error for duplicate product name', function(done){
			var category = new Category({
					name: 'Beverages',
					description: 'Soft drinks, coffees, teas, beers, and ales'
			});

			var product = new Product({
				category: category.id,
				name: 'duplicate',
				quantityPerUnit: '6',
				unitPrice: '10',
				unitsInStock: '100',
			});

			product.save(function(err) {
				should.not.exist(err);

				var duplicateProduct = new Product({
					category: category.id,
					name: 'duplicate',
					quantityPerUnit: '61',
					unitPrice: '1',
					unitsInStock: '10',
				});

				duplicateProduct.save(function(err) {
					err.err.indexOf('$name').should.not.equal(-1);
					err.err.indexOf('duplicate key error').should.not.equal(-1);
					should.exist(err);
					done();
				});

			});
		});

		it('sets defaults and doesn\'t complain', function(done){
			var category = new Category({
					name: 'Beverages',
					description: 'Soft drinks, coffees, teas, beers, and ales'
			});

			var product = new Product({
				category: category.id,
				name: 'default please',
			});

			product.save(function(err){
				should.not.exist(err);
				done();
			});
		});
	});



	afterEach(function(done) {
			// NB this deletes ALL products (but is run against a test database)
			Category.remove().exec();
			Product.remove().exec();
			done();
	});
});
