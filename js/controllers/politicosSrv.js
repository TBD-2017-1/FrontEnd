angular.module('poliTweets')
    .service('politicosService', function($http){

        function getPoliticos(){ 
            return $http.get('politicos.json');
        }

        return {
        	getPoliticos: getPoliticos
        }
    });