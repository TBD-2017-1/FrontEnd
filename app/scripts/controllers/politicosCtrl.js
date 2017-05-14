angular.module('poliTweets')
	.controller('politicosCtrl', function($scope, politicosService, partidosService, conglomeradosService){
		$scope.politicos = [];
		$scope.partidos = [];
		$scope.conglomerados = [];
		$scope.politicoSeleccionado = {};
		$scope.newPolitico = {};
		$scope.setID= {};
		$scope.newKeywordPol = {};
		$scope.palabra = {};

		function Politicos(){

			$scope.crearPolitico = function(newPolitico){
				politicosService.crearPolitico(newPolitico);
				$scope.newPolitico = {};
			}
			
			$scope.setPolitico = function(politico){
				$scope.politicoSeleccionado = politico;
				$scope.setID = politico.id;
			}

			$scope.editarPolitico = function(politico){
				politicosService.editarPolitico(politico, $scope.setID);
			}

			$scope.borrarPolitico = function(politico){
				politicosService.borrarPolitico(politico, $scope.setID);
			}

			$scope.agregarKeywordPolitico = function(newKeywordPol){
				$scope.palabra = { value: newKeywordPol };
				politicosService.addKeywordPolitico($scope.palabra,$scope.selectPolitico.id);
				$scope.newKeywordPol = {};
			}

			/*$scope.borrarKeywordPolitico = function(keyword){
				partidosService.borrarPolitico(keyword, keyword.id);
			}*/

			politicosService.getPoliticos().then(function(data){			
					$scope.politicos = data;
					//console.log($scope.politicos);
			}, function(error){
					console.log(error, "noooo error");		
			});
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
		Politicos();

});