angular.module('poliTweets')
  .service('mapaService', function($location,$http){
  	
  	this.getMapaAprob = function(){
  		var URL1= 'http://107.170.99.162:8080/backend/metricas/aprobacion/regiones';
      return $http.get(URL1);
    };

    this.getMapaPos = function(){
      var URL1= 'http://107.170.99.162:8080/backend/metricas/sentimientoPositivo/regiones';
      return $http.get(URL1);
    };

    this.getMapaNeg = function(){
      var URL1= 'http://107.170.99.162:8080/backend/metricas/sentimientoNegativo/regiones';
      return $http.get(URL1);
    };

    this.getMapaNeu = function(){
      var URL1= 'http://107.170.99.162:8080/backend/metricas/sentimientoNeutro/regiones';
      return $http.get(URL1);
    };

  });
