
	"use strict";

	angular.module('chatApp').controller("roomCtrl", ['$scope', '$firebaseArray', 
		function($scope, $firebaseArray){
			//set link reference to database according to the current room
			getRoomRef = function(){
				var ref = new Firebase("https://vivid-inferno-5718.firebaseio.com/Rooms/" + $scope.currentRoom);
				return $firebaseArray(ref);
			}

			//Set up a default user until user logic is set up
			$scope.user = "Luciano";

			//Adds a new message to the database when user sends it
			$scope.sendMessage = function(){
				if($scope.message.length === 0){

				} else{
					$scope.messages = getRoomRef();
					$scope.messages.$add({
						author: $scope.user,
						text: $scope.message,
						date: Firebase.ServerValue.TIMESTAMP 
					});
					$scope.message = "";
				}
			};
		}
	]);
