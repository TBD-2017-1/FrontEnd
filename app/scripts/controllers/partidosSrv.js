angular.module('angularSpa')
    .service('partidosService', function($http){
    	var URL= 'http://localhost:8080/backend/partidos';

        this.getPartidos = function(){ 
            return $http.get(URL);
        };

        
    });