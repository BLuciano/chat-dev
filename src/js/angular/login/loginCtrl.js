"use strict";

angular.module('chatApp').controller("loginCtrl", ['$scope', '$firebaseAuth', '$firebaseArray',
	function($scope, $firebaseAuth, $firebaseArray){
		var ref =  new Firebase("https://vivid-inferno-5718.firebaseio.com/Users");
		var loginRef =  new Firebase("https://vivid-inferno-5718.firebaseio.com");
		var login = $firebaseAuth(loginRef);
		var usernames = new $firebaseArray(ref);
		$scope.message = null;
		$scope.error = null;

		//when a new user is created, save the username reference in the
		//database and set it to user.  
		saveUser = function(){
			$scope.setUser($scope.newUserName); 
			$firebaseArray(ref).$add({
				userName: $scope.newUserName,
				email: $scope.newEmail
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
			$scope.email ="";
			$scope.password = "";
			$scope.newEmail = "";
			$scope.newPassword = "";
			$scope.passRepeat = "";
			$scope.newUserName = "";
		}
		
		//create a new user 
		$scope.createUser = function(){
			//First make sure passwords are matching
			if(usernameExists()){
				$scope.error = "Sorry! Username is already taken";
			}
			else if($scope.newPassword !== $scope.passRepeat){
				$scope.error = "Passwords must match";
			} else {
				login.$createUser({
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

		//Log in user
		$scope.logIn = function(){
			ref.authWithPassword({
  				email : $scope.email,
  				password : $scope.password
			}, function(error, authData) {
  				if(error) {
    				$scope.error = error;
  				} else {
  					$scope.setLog(true);
    				$scope.message = "Logged in successfully!"; 
    				clearFields();  				
    				for(var i = 0; i < usernames.length; i++){
    					if(usernames[i].email === $scope.email){
    						$scope.setUser(usernames[i].userName);
    					}
    				}
				}
			});
		}
	}
]);