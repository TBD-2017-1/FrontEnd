angular.module('poliTweets')
		.controller('mainCtrl', function($scope, $location){
			$scope.toHome = function(){
				$location.url('/home');
			}
			$scope.toDetailsCongl = function(){
				$location.url('/aprobacionConglomerados');
			}
			$scope.toDetailsPart = function(){
				$location.url('/aprobacionPartidos');
			}
			$scope.toDetailsPolit = function(){
				$location.url('/aprobacionPoliticos');
			}
			$scope.toInfluences = function(){
				$location.url('/influencias');
			}
});
