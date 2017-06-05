angular.module('poliTweets')
    .service('loginService', function($location,$http){
    	this.getUsuario = function(user,pass){
            return $http.get('http://107.170.99.162:8080/backend/admins/verify/'+user+'/'+pass);
        };
    });
