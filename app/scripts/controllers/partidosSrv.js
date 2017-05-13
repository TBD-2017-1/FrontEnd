angular.module('angularSpa')
    .service('partidosService', function($location,$http){
    	var URL= 'http://localhost:8080/backend/partidos';
        this.getPartidos = function(){ 
            return $http.get(URL);
        };

        this.crearPartido = function(partido){
            return $http.post(URL, partido)
            .then(function(){
            	$location.url("/adminPartidos");
				window.location.reload();
            },
            function(){
            	console.log(error);
            });
        };

        this.editarPartido = function(partido, id){
            console.log(id)
            console.log(partido)
            return $http.put('http://localhost:8080/backend/partidos/' + id, partido);
        };

        this.borrarPartido = function(partido, id){
            console.log(id)
            console.log(partido)
            return $http.delete('http://localhost:8080/backend/partidos/' + id, partido)
            .then(function(){
            	$location.url("/adminPartidos");
				window.location.reload();
            },
            function(){
            	console.log(error);
            });
        };
    });