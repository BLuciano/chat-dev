(function(){
	"use strict";
	
	angular.module('chatApp', ['ngRoute', 'firebase'])

	.controller("mainCtrl", ['$scope', '$route', '$firebaseArray', '$firebaseObject', 'auth', 
		function($scope, $route, $firebaseArray, $firebaseObject, auth){
		$scope.currentRoom = 'General';
		$scope.rooms = ['General', 'HTLM', 'CSS', 'JavaScript', 'PHP',
						'Ruby', 'Java', 'IOS', 'Android', 'Design'];
		
		var userRef =  new Firebase("https://vivid-inferno-5718.firebaseio.com/Users");
		var users = new $firebaseArray(userRef);				
		var findUser = function(email){
			for(var i = 0; i < users.length; i++){
    			if(users[i].email === email){
    				var user = users[i].userName;
    				return user;
    			}
    		}
    	}

		$scope.auth = auth;
		$scope.auth.$onAuth(function(authData){
			$scope.authData = authData;
			if(authData){
				/*Wait for the user data to be loaded before using it. 
				Usedfor initial page load to automatically set up cached logged users.*/
				var obj = $firebaseObject(userRef);
				obj.$loaded().then(function(){
				$scope.setUser(findUser(authData.password.email));
			});
			}
		});

		$scope.setUser = function(user){
			$scope.user = user;
		};

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

		//Reload the page everytime a new room is changed in order to update messages.
		$scope.reloadPage = function(){
			$route.reload();
		};
	}]) //end of mainCtrl

	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'views/landing.html',
			controller: 'mainCtrl'
		})
		.when('/login', {
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