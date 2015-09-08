"use strict";

angular.module('chatApp').controller("loginCtrl", ['$scope', '$firebaseAuth', 
	function($scope, $firebaseAuth){
		//set link reference to user's database 
		getLoginRef = function(){
			var ref = new Firebase("https://vivid-inferno-5718.firebaseio.com");
			return $firebaseAuth(ref);
		};
		
		$scope.createUser = function(){
			$scope.message = null;
			$scope.error = null;
			
			if($scope.newPassword !== $scope.passRepeat){
				$scope.error = "Passwords must match";
			} else {
				var ref = getLoginRef();
				ref.$createUser({
					email: $scope.newEmail,
					password: $scope.newPassword
				}).then(function(userData) {
					$scope.message = "User successfully created!";
				}).catch(function(error){
					if(error === "undefined"){
						$scope.error = "Unknown error trying to create user";
					} else {
						$scope.error = error;
					}
				});
			}
		};
	}
]);