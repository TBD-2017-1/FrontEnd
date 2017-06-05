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
            return $http.put('http://localhost:8080/backend/partidos/' + id, partido)
            .then(function(){
                $location.url("/adminPartidos");
                window.location.reload();
            },
            function(){
                console.log(error);
            });
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

        this.getPartidoKeywords = function(id){ 
            return $http.get('http://localhost:8080/backend/partidos/'+id+'/keywords');
        };

        this.addKeywordPartido = function(keyword, id){
            return $http.post('http://localhost:8080/backend/partidos/'+id+'/addkeyword',keyword)
            .then(function(){
                $location.url("/adminPartidos");
                window.location.reload();
            },
            function(error){
            });
        };

        this.removeKeywordPartido = function(keywordid, id){
            console.log("id partido:" + id)
            console.log("id keyword:" + keywordid)
            return $http.delete('http://localhost:8080/backend/partidos/'+id+'/removekeyword/'+keywordid)
            .then(function(){
                $location.url("/adminPartidos");
                window.location.reload();
            },
            function(){
                console.log("error al borrar");
            });
        };

        
    });