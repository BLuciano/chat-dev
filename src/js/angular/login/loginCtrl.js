"use strict";

angular.module('chatApp').controller("loginCtrl", ['$scope', '$firebaseAuth', '$firebaseArray',
	function($scope, $firebaseAuth, $firebaseArray){
		var ref =  new Firebase("https://vivid-inferno-5718.firebaseio.com/Users");
		var usernames = new $firebaseArray(ref);

		//when a new user is created, save the username reference in the
		//database and set it to user.  
		saveUser = function(){
			$scope.setUser($scope.newUserName); 
			$firebaseArray(ref).$add({
				userName: $scope.newUserName
			});
		};

		//Check to see if the username already exists.
		usernameExists = function(){
			for(var i = 0; i < usernames.length; i++){
				if($scope.newUserName === usernames[i].userName){
					console.log($scope.newUserName);
					return true;
				}
			}
		};

		//Clear the registration form fields once the form is successfully submitted.
		clearFields = function(){
			$scope.newEmail = "";
			$scope.newPassword = "";
			$scope.passRepeat = "";
			$scope.newUserName = "";
		}
		
		//create a new user 
		$scope.createUser = function(){
			$scope.message = null;
			$scope.error = null;
			var loginRef =  new Firebase("https://vivid-inferno-5718.firebaseio.com");
			
			//First make sure passwords are matching
			if(usernameExists()){
				$scope.error = "Sorry! Username is already taken";
			}
			else if($scope.newPassword !== $scope.passRepeat){
				$scope.error = "Passwords must match";
			} else {
				$firebaseAuth(loginRef).$createUser({
					email: $scope.newEmail,
					password: $scope.newPassword
				}).then(function(userData) {
					$scope.message = "User successfully created!";
					$scope.setLog(true);
					saveUser(); 
					clearFields();
				}).catch(function(error){
					if(error === "undefined"){
						$scope.error = "Unknown error trying to create user";
					} else {
						$scope.error = error;
					}
				});
			}
		}; //end of createUser
	}
]);