(function(){
	"use strict";
	
	angular.module('chatApp', ['ngRoute', 'firebase'])

	.controller("mainCtrl", ['$scope', function($scope){
		$scope.currentRoom = 'General';
		$scope.rooms = ['General', 'HTLM', 'CSS', 'JavaScript', 'PHP',
						'Ruby', 'Java', 'IOS', 'Android', 'Design'];
		
		//Set the current room the user is in. Used to update the rooms 
		//links and retrieve database information from the specified room.
		$scope.setCurrent = function(room){
			$scope.currentRoom = room;
		};

		//Set the current selected link on the rooms menu window
		$scope.isActive = function(room){
			if($scope.currentRoom === room){
				return true;
			}
		};
	}]) //end of mainCtrl

	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'loginCtrl'
		})
		.when('/rooms', {
			templateUrl: 'views/rooms.html',
			controller: 'roomCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]); 
})();