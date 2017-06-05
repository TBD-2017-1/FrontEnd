angular.module('poliTweets')
	.controller('loginCtrl', function($location, $scope, loginService,$cookies){
		$scope.username = $cookies.get('sesion');

			$scope.login = function(){
				loginService.getUsuario($scope.usuario,$scope.contrasena).then(function(data){
					}, function(error){
						$scope.respuesta = error.status;
						console.log($scope.respuesta);

						if($scope.respuesta == '302'){	
							$cookies.put('sesion',$scope.usuario);
							$scope.username = $cookies.get('sesion');
							$location.path('/admin');
							window.location.reload();
						} else{
							alert("Usuario o contraseña incorrecto.");
						}
						
					});


			}

			$scope.logout = function(){
				$cookies.remove('sesion');
				$scope.username = {};
				$location.url("/home");
	            window.location.reload();
			}


	});