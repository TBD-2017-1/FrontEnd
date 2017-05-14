angular.module('poliTweets')
	.controller('conglomeradosCtrl', function($scope, conglomeradosService){
		$scope.conglomerados = [];
		$scope.partidos = [];
		$scope.conglomerados = [];
		$scope.conglomeradoSeleccionado = {};
		$scope.newConglomerado = {};
		$scope.setID= {};
		$scope.newKeywordCong = {};
		$scope.palabra = {};

		function Conglomerados(){

			$scope.crearConglomerado = function(newConglomerado){
				conglomeradosService.crearConglomerado(newConglomerado);
				$scope.newConglomerado = {};
			}
			
			$scope.setConglomerado = function(conglomerado){
				$scope.conglomeradoSeleccionado = conglomerado;
				$scope.setID = conglomerado.id;
			}

			$scope.editarConglomerado = function(conglomerado){
				conglomeradosService.editarConglomerado(conglomerado, $scope.setID);
			}

			$scope.borrarConglomerado = function(conglomerado){
				conglomeradosService.borrarConglomerado(conglomerado, $scope.setID);
			}

			$scope.agregarKeywordConglomerado = function(newKeywordCong){
				$scope.palabra = { value: newKeywordCong };
				conglomeradosService.addKeywordConglomerado($scope.palabra,$scope.selectConglomerado.id);
				$scope.newKeywordCong = {};
			}

			conglomeradosService.getConglomerados().then(function(data){			
					$scope.conglomerados = data;
					//console.log($scope.Conglomerados);
			}, function(error){
					console.log(error, "noooo error");		
			});

		}
		Conglomerados();

});