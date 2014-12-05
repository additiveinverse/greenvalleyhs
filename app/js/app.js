angular.module('gvhsApp', [ 'ngRoute' ])
	.config([ '$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainController'
			});
	}]);