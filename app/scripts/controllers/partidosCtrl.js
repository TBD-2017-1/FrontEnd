angular.module('poliTweets')
	.controller('partidosCtrl', function($location, $scope, partidosService, conglomeradosService){
		$scope.partidos = [];
		$scope.conglomerados = [];
		$scope.partidoSeleccionado = {};
		$scope.newPartido = {};
		$scope.setID= {};
		$scope.newKeywordPart = {};
		$scope.palabra = {};
		$scope.partidoKeywords = [];

		function Partidos(){

			$scope.crearPartido = function(newPartido){
				partidosService.crearPartido(newPartido);
				$scope.newPartido = {};
			}

			$scope.setPartido = function(partido){
				$scope.partidoSeleccionado = partido;
				$scope.setID = partido.id;

				partidosService.getPartidoKeywords($scope.setID).then(function(data){
                    $scope.partidoKeywords = data;
                },function(error){
                    console.log(error, "noooo error");
                });
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

            $scope.borrarKeywordPartido = function(keywordid){
                partidosService.removeKeywordPartido(keywordid,$scope.selectPartido.id);
            }


			partidosService.getPartidos().then(function(data){
				$scope.partidos= data;
			}, function(error){
			});

			conglomeradosService.getConglomerados().then(function(data){
				$scope.conglomerados= data;
			}, function(error){
			});

		}

		Partidos();

});