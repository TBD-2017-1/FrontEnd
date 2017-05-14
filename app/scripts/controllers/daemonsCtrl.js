angular.module('poliTweets')
	.controller('daemonsCtrl', function($scope,daemonsService){
		$scope.estado = {};
		$scope.enviar = {};
	  	$scope.message = 'off';

	  	function Daemons(){
		  	$scope.onChange = function(state) {
		    if(state == false){ $scope.message = "off";}
		    else{ $scope.message = "on";}
		    $scope.enviar = { collector : state };
		    daemonsService.setEstado($scope.enviar);
		 	};
		 }

		Daemons();

	});