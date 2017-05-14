angular.module('poliTweets')
	.controller('partidosCtrl', function($location, $scope, partidosService, conglomeradosService){
		$scope.partidos = [];
		$scope.conglomerados = [];
		$scope.partidoSeleccionado = {};
		$scope.newPartido = {};
		$scope.setID= {};
		$scope.newKeywordPart = {};
		$scope.palabra = {};

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

			$scope.agregarKeywordPartido = function(newKeywordPart){
				$scope.palabra = { value: newKeywordPart };
				partidosService.addKeywordPartido($scope.palabra,$scope.selectPartido.id);
				$scope.newKeywordPart = {};
			}

			/*$scope.borrarKeywordPartido = function(keyword){
				partidosService.borrarPartido(keyword, keyword.id);
			}*/


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