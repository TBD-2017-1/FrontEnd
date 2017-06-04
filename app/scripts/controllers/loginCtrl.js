angular.module('poliTweets')
	.controller('loginCtrl', function($location, $scope, loginService,$cookies){

		$scope.submit = function(){

/*			loginService.getUsuario($scope.user,$scope.pass).then(function(data){
					$scope.respuesta= data;
				}, function(error){
						console.log(error, "noooo error");	
				});*/

			if($scope.username == "admin" && $scope.password == "admin"){
				$cookies.put('sesion',$scope.username);				
				$location.path('/admin');
				window.location.reload();
			} else{
				alert("Usuario o contraseña incorrecto.");
			}
		}

	});