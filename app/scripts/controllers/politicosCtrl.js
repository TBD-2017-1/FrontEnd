angular.module('poliTweets')
	.controller('politicosCtrl', function($scope, politicosService, partidosService, conglomeradosService){
		$scope.politicos = [];
		$scope.partidos = [];
		$scope.conglomerados = [];
		$scope.politicoSeleccionado = {};
		$scope.newPolitico = {};
		$scope.setID = {};
		$scope.newKeywordPol = {};
		$scope.palabra = {};
		$scope.politicoKeywords = [];

		function Politicos(){

			$scope.crearPolitico = function(newPolitico){
				politicosService.crearPolitico(newPolitico);
				$scope.newPolitico = {};
			}
			
			$scope.setPolitico = function(politico){
				$scope.politicoSeleccionado = politico;
				$scope.setID = politico.id;

				politicosService.getPoliticoKeywords($scope.setID).then(function(data){
					$scope.politicoKeywords = data;
				},function(error){
				});

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

			$scope.borrarKeywordPolitico = function(keywordid){
				politicosService.removeKeywordPolitico(keywordid,$scope.selectPolitico.id);
			}

			politicosService.getPoliticos().then(function(data){			
				$scope.politicos = data;
			}, function(error){
			});

			partidosService.getPartidos().then(function(data){
				$scope.partidos= data;
			}, function(error){
			});

			conglomeradosService.getConglomerados().then(function(data){
				$scope.conglomerados= data;
			}, function(error){
			});

		}
		Politicos();

});