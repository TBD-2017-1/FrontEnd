angular.module('angularSpa')
	.controller('politicosCtrl', function($scope, politicosService, partidosService, conglomeradosService){
		$scope.politicos = [];
		$scope.partidos = [];
		$scope.conglomerados = [];
		$scope.politicoSeleccionado = {};
		$scope.newPolitico = {};

		function Politicos(){
			$scope.crearPolitico = function(){
				politicosService.crearPolitico(
					$scope.form.nombre,
					$scope.form.apellido,
					$scope.form.cuentaTwitter,
					$scope.form.partido,
					$scope.form.conglomerado)
				console.log($scope.form.partido);  
	            $scope.form.nombre ="";
				$scope.form.apellido="";
				$scope.form.cuentaTwitter="";
				$scope.form.partido="";
				$scope.form.conglomerado="";
			}

			
			$scope.editPolitico = function(politico){
				$scope.politicoSeleccionado = politico;
				console.log("pium");
				console.log($scope.politicoSeleccionado);
				console.log(politico);
			}

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