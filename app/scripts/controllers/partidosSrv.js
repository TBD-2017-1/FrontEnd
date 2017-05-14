angular.module('poliTweets')
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

/*        this.borrarKeywordPartido = function(keyword, id){
            console.log(id)
            console.log(keyword)
            return $http.delete('http://localhost:8080/backend/partidos/'+id+'/deletekeyword', keyword)
            .then(function(){
                $location.url("/adminPartidos");
                window.location.reload();
            },
            function(){
                console.log(error);
            });
        };*/

        this.addKeywordPartido = function(keyword, id){
            return $http.post('http://localhost:8080/backend/partidos/'+id+'/addkeyword',keyword)
            .then(function(){
                console.log(keyword);
                console.log(id);
                $location.url("/adminPartidos");
                window.location.reload();
            },
            function(){
                console.log(error);
            });
        };

        
    });