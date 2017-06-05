angular.module('poliTweets')
	.controller('influenciasCtrl', function($scope,influenciasService){
    $scope.infCongl = [];
    $scope.infPart = [];
    $scope.infPol = [];

		function Influencias(){
      influenciasService.getInfluenciasConglomerados().then(function(data){
        $scope.infCongl = data;
      }, function(error){

      });

      influenciasService.getInfluenciasPartidos().then(function(data){
        $scope.infPart = data;
      }, function(error){

      });

      influenciasService.getInfluenciasPoliticos().then(function(data){
        $scope.infPol = data;
      }, function(error){

      });
    }

	});
