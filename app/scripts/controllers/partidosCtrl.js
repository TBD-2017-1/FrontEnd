angular.module('angularSpa')
	.controller('partidosCtrl', function($location, $scope, partidosService, conglomeradosService){
		$scope.partidos = [];
		$scope.conglomerados = [];
		$scope.partidoSeleccionado = {};
		$scope.newPartido = {};
		$scope.setID= {};

		function Partidos(){

			$scope.crearPartido = function(newPartido){
				partidosService.crearPartido(newPartido);
				$scope.newPartido = {};

			}

			$scope.setPartido = function(partido){
				$scope.partidoSeleccionado = partido;
				$scope.setID = partido.id;
			}

			$scope.editarPartido = function(partido){
				partidosService.editarPartido(partido, $scope.setID);
			}

			$scope.borrarPartido = function(partido){
				partidosService.borrarPartido(partido, $scope.setID);
			}

			partidosService.getPartidos().then(function(data){
				$scope.partidos= data;
			}, function(error){
					console.log(error, "noooo error");	
			});
			conglomeradosService.getConglomerados().then(function(data){
				$scope.conglomerados= data;
			}, function(error){
					console.log(error, "noooo error");	
			});

		}

		Partidos();

});