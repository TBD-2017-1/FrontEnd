angular.module('poliTweets')
		.controller('mapaCtrl', function($scope, leafletData, mapaService){
			$scope.defaults = {
				tileLayer: 'img/SVG/cl.svg',
				path: {
					weight: 10,
					color: '#800000',
					opacity: 1
				}
			}
			leafletData.getMap().then(function(map){
				console.log(map);
			});
			/*$scope.center = {
				lat: 0,
				lng: 0,
				zoom: 8
			}*/
});
