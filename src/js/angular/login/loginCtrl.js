"use strict";

angular.module('chatApp').factory("login", [ '$firebaseArray', 
	function( $firebaseArray){
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

			findUser : function(email){
				for(var i = 0; i < users.length; i++){
    				if(users[i].email === email){
    					return users[i].userName;
    				}
    			}
    		}
		};
}]);


angular.module('chatApp').controller("loginCtrl", ['$scope', '$firebaseAuth', 'login', 
	function($scope, $firebaseAuth, login){
		var loginRef =  new Firebase("https://vivid-inferno-5718.firebaseio.com");
		var ref = $firebaseAuth(loginRef);
		
		clearFields = function(){
			$scope.email = "";
			$scope.password = "";
			$scope.newEmail = "";
			$scope.newPassword = "";
			$scope.passRepeat = "";
			$scope.newUserName = "";
		};

		//log in user
		$scope.logUser = function(email, pass, user){
			loginRef.authWithPassword({
  				email : email || $scope.email,
  				password : pass || $scope.password
			}, function(error, authData) {
  				if(error) {
  					$scope.message = "";
    				switch (error.code) {
      					case "INVALID_EMAIL":
        					$scope.error = "Email is invalid";
        					break;
      					case "INVALID_PASSWORD":
        					$scope.error = "password is incorrect";
        					break;
      					case "INVALID_USER":
        					$scope.error = "Error: please check your email";
        					break;
      					default:
        					$scop.error = "Unknown error logging user in";
    				}
  				} else {
  					$scope.error = "";
    				$scope.message = "Logged in successfully!"; 			
    				$scope.setUser(user || login.findUser($scope.email));
    				clearFields();
				}
			});
		}; //end of LogUser

		//create a new user 
		$scope.createUser = function(){
			//First make sure passwords are matching
			if(login.usernameExists($scope.newUserName)){
				$scope.error = "Sorry! Username is already taken";
			}
			else if($scope.newPassword !== $scope.passRepeat){
				$scope.error = "Passwords must match";
			} else {
				ref.$createUser({
					email: $scope.newEmail,
					password: $scope.newPassword
				}).then(function(userData) {
					$scope.error = "";
					$scope.message = "User successfully created!";
					login.saveUser($scope.newUserName, $scope.newEmail);
					$scope.logUser($scope.newEmail, $scope.newPassword, $scope.newUserName);
				}).catch(function(error){
					$scope.message = "";
					switch (error.code) {
      					case "EMAIL_TAKEN":
       						$scope.error = "Sorry! Email is already taken";
        					break;
      					case "INVALID_EMAIL":
        					$scope.error = "Please enter a valid email";
        					break;
      					default:
        					$scope.error = "Unknown error trying to create user";
    				}
				}); 
			}
		}; //end of createUser	
	}
]);