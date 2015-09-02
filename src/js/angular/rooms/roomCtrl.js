
	"use strict";

	angular.module('chatApp').controller("roomCtrl", ['$scope', '$firebaseArray', 
		function($scope, $firebaseArray){
			//set link reference to database according to the current room
			getRoomRef = function(){
				var ref = new Firebase("https://vivid-inferno-5718.firebaseio.com/Rooms/" + $scope.currentRoom);
				return ref;
			};

			//Loads initial messages each time the room is changed.		
			loadMessages = function(){
				var query = getRoomRef().orderByChild("date").limitToLast(50);
				$scope.messages = $firebaseArray(query);
			};
			loadMessages();
	
			//Set up a default user until user logic is set up
			$scope.user = "Luciano";

			//Adds a new message to the database when user sends it
			$scope.sendMessage = function(){
				if($scope.message.length === 0){

				} else{
					$firebaseArray(getRoomRef()).$add({
						author: $scope.user,
						text: $scope.message,
						date: Firebase.ServerValue.TIMESTAMP 
					});
					$scope.message = "";
				}
			};
		}
	]);
