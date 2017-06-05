angular.module('poliTweets')
    .service('influenciasService', function($http){

		this.getInfluenciasConglomerados = function(){
            return $http.get('http://107.170.99.162:8080/backend/influencias/conglomerado');
        };

    this.getInfluenciasPartidos = function(){
            return $http.get('http://107.170.99.162:8080/backend/influencias/partido');
        };

    this.getInfluenciasPoliticos = function(){
            return $http.get('http://107.170.99.162:8080/backend/influencias/politico');
        };

    });
