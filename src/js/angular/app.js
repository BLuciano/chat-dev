(function(){
	"use strict";
	
	var app = angular.module('chatApp', ['ngRoute', 'firebase']);

	app.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'loginController'
		})
		.when('/rooms', {
			templateUrl: 'views/rooms.html',
			controller: 'roomsController'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);
})();