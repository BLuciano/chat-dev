"use strict";

angular.module('chatApp').factory("auth", ['$firebaseAuth', function($firebaseAuth){
		var loginRef =  new Firebase("https://vivid-inferno-5718.firebaseio.com");
		return $firebaseAuth(loginRef);
}]);

angular.module('chatApp').factory("login", ['$firebaseArray', function( $firebaseArray){
		var userRef =  new Firebase("https://vivid-inferno-5718.firebaseio.com/Users");
		var users = new $firebaseArray(userRef);

		return{
			//Adds new user to database on creation.
			saveUser: function(name, email){
				users.$add({
				userName: name,
				email: email
				});
			},

			//Check to see if the username already exists.
			usernameExists : function(name){
				for(var i = 0; i < users.length; i++){
					if(name === users[i].userName){
						return true;
					}
				}
			},
		};
		
	}
]);

