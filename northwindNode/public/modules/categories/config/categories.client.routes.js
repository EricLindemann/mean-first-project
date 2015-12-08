'use strict';

//Setting up route
angular.module('categories').config(['$stateProvider',
	function($stateProvider) {
		// Categories state routing
		$stateProvider.
		state('view-category', {
			url: '/categoryview',
			templateUrl: 'modules/categories/views/view-category.client.view.html'
		}).
		state('edit-category', {
			url: '/categoriesedit',
			templateUrl: 'modules/categories/views/edit-category.client.view.html'
		}).
		state('listCategories', {
			url: '/categories',
			templateUrl: 'modules/categories/views/categories.client.view.html'
		}).
		state('createCategory', {
			url: '/categories/create',
			templateUrl: 'modules/categories/views/create-category.client.view.html'
		}).
		state('viewCategory', {
			url: '/categories/:categoryId',
			templateUrl: 'modules/categories/views/view-category.client.view.html'
		}).
		state('editCategory', {
			url: '/categories/:categoryId/edit',
			templateUrl: 'modules/categories/views/edit-category.client.view.html'
		});
	}
]);