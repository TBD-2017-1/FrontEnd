angular.module('poliTweets')
    .service('loginService', function($location,$http){
    	this.getUsuario = function(user,pass){ 
            return $http.get('http://localhost:8080/backend/admins/verify/'+user+'/'+pass);
        };
    });