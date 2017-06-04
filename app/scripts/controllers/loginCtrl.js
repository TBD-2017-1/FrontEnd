angular.module('poliTweets')
	.controller('loginCtrl', function($location, $scope, loginService,$cookies){
		$scope.username = $cookies.get('sesion');

			$scope.login = function(){

	/*			loginService.getUsuario($scope.user,$scope.pass).then(function(data){
						$scope.respuesta= data;
					}, function(error){
							console.log(error, "noooo error");	
					});*/

				if($scope.usuario == "admin" && $scope.contrasena == "admin"){
					$cookies.put('sesion',$scope.usuario);
					$scope.username = $cookies.get('sesion');
					$location.path('/admin');
					/*window.location.reload();*/
				} else{
					alert("Usuario o contraseña incorrecto.");
				}
			}

			$scope.logout = function(){
				$cookies.remove('sesion');
				$scope.username = {};
				$location.url("/home");
	            window.location.reload();
			}


	});