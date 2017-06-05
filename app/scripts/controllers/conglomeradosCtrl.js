angular.module('poliTweets')
	.controller('conglomeradosCtrl', function($scope, conglomeradosService){
		$scope.conglomerados = [];
		$scope.partidos = [];
		$scope.conglomeradoSeleccionado = {};
		$scope.newConglomerado = {};
		$scope.setID= {};
		$scope.newKeywordCong = {};
		$scope.palabra = {};
		$scope.conglomeradoKeywords = [];

		function Conglomerados(){

			$scope.crearConglomerado = function(newConglomerado){
				conglomeradosService.crearConglomerado(newConglomerado);
				$scope.newConglomerado = {};
			}
			
			$scope.setConglomerado = function(conglomerado){
				$scope.conglomeradoSeleccionado = conglomerado;
				$scope.setID = conglomerado.id;

				conglomeradosService.getConglomeradoKeywords($scope.setID).then(function(data){
                    $scope.conglomeradoKeywords = data;
                },function(error){
                });
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

            $scope.borrarKeywordConglomerado = function(keywordid){
                conglomeradosService.removeKeywordConglomerado(keywordid,$scope.selectConglomerado.id);
            }

			conglomeradosService.getConglomerados().then(function(data){			
				$scope.conglomerados = data;
			}, function(error){
			});

		}
		Conglomerados();

});