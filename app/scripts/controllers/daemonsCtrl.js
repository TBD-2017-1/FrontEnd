angular.module('poliTweets')
	.controller('daemonsCtrl', function($scope,daemonsService){
		$scope.estado = {};


	  	daemonsService.getDaemon().then(function(data){			
				$scope.estado = data.data.status;

				if($scope.estado == "off"){ $scope.message = "Recolectores desactivados";}
			    else{ $scope.message = "Recolectores activados";}

				console.log($scope.estado);
			}, function(error){
			});

	  	

	  	function Daemons(){
		  	$scope.onChange = function(state) {

			    daemonsService.setEstado().then(function(data){			
					$scope.newEstado = data;
					console.log($scope.newEstado);
				}, function(error){
				});

				if($scope.newEstado == "off"){ $scope.message = "Recolectores desactivados";}
			    else{ $scope.message = "Recolectores activados";}

		 	};

		 }

		 
		Daemons();

	});