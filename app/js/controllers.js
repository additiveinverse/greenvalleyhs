angular.module('gvhsApp', [ 'ngSanitize' ])
	.controller('MainController', function($scope, $http, $sce) {
		$scope.posts = "Hellow, World!";
	});