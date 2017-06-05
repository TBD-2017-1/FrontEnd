angular.module('poliTweets')
    .service('daemonsService', function($http){

		this.getDaemon = function(){ 
            return $http.get('http://localhost:8080/backend/daemon/status');
        };

        this.setEstado = function(){
            return $http.get('http://localhost:8080/backend/daemon/toggle');
        };
       
    });