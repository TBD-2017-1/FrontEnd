angular.module('poliTweets')
    .service('mapaService', function($location,$http){
    	this.getMapaInfo = function(){
            return $http.get('http://107.170.99.162:8080/backend/');
        };
    });
