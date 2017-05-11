angular.module('poliTweets')
	.controller('politicosCtrl', function($scope, politicosService){
		$scope.politicos = [];

		politicosService.getPoliticos().then(function(data){			
				$scope.politicos = data;

		}, function(error){
				console.log(error, "noooo error");		
	});

});