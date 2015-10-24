"use strict";

angular.module('chatApp').controller("roomCtrl", ['$scope','$firebaseArray', 
	function($scope, $firebaseArray){
		var ref = new Firebase("https://vivid-inferno-5718.firebaseio.com/Rooms/" + $scope.currentRoom);
		//Loads initial messages each time the room is changed.		
		(function(){
			var query = ref.orderByChild("date").limitToLast(50);
			$scope.messages = $firebaseArray(query);
		}());

		//Adds a new message to the database when user sends it
		$scope.sendMessage = function(){
			if($scope.message.length === 0){
				return;
			} else{
				$firebaseArray(ref).$add({
					author: $scope.user,
					text: $scope.message,
					date: Firebase.ServerValue.TIMESTAMP 
				});
				$scope.message = "";
			}
		};
	}
]);
