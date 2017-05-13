angular.module('angularSpa')
    .service('conglomeradosService', function($http){
    	var URL= 'http://localhost:8080/backend/conglomerados';

        this.getConglomerados = function(){ 
            return $http.get(URL);
        };

        
    });