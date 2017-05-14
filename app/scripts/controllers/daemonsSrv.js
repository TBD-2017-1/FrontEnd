angular.module('angularSpa')
    .service('daemonsService', function($http){
    	var URL= 'http://localhost:8080/backend/admins/daemons';

        this.setEstado = function(state){
            console.log(state);
/*            return $http.PUT(URL,state);
*/        };
       
    });