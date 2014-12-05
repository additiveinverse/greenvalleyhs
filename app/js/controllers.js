angular.module('gvhsApp', [ 'ngRoute', 'ngSanitize' ])
	.controller('MainController', function($scope, $http, $sce) {
		$scope.posts = "Hello, World!";
	});