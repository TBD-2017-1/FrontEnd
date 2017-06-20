angular.module('poliTweets')
    .service('partidosService', function($location,$http){
    	var URL= 'http://107.170.99.162:8080/backend/partidos';
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
            return $http.put('http://107.170.99.162:8080/backend/partidos/' + id, partido);
        };

        this.borrarPartido = function(partido, id){
            console.log(id)
            console.log(partido)
            return $http.delete('http://107.170.99.162:8080/backend/partidos/' + id, partido)
            .then(function(){
            	$location.url("/adminPartidos");
				window.location.reload();
            },
            function(){
            	console.log(error);
            });
        };

        this.getPartidoKeywords = function(id){
            return $http.get('http://107.170.99.162:8080/backend/partidos/'+id+'/keywords');
        };

        this.addKeywordPartido = function(keyword, id){
            return $http.post('http://107.170.99.162:8080/backend/partidos/'+id+'/addkeyword',keyword)
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
            return $http.delete('http://107.170.99.162:8080/backend/partidos/'+id+'/removekeyword/'+keywordid)
            .then(function(){
                $location.url("/adminPartidos");
                window.location.reload();
            },
            function(){
                console.log("error al borrar");
            });
        };

        this.getPartiApr = function(){
            var URL2= 'http://107.170.99.162:8080/backend/metricas/aprobacion/partidos';
            return $http.get(URL2);
        };

        this.getPartiPos = function(){
            var URL2= 'http://107.170.99.162:8080/backend/metricas/sentimientoPositivo/partidos';
            return $http.get(URL2);
        };

        this.getPartiNeg = function(){
            var URL2= 'http://107.170.99.162:8080/backend/metricas/sentimientoNegativo/partidos';
            return $http.get(URL2);
        };

        this.getPartiNeu = function(){
            var URL2= 'http://107.170.99.162:8080/backend/metricas/sentimientoNeutro/partidos';
            return $http.get(URL2);
        };

        this.getRanking = function(){
            return $http.get('http://107.170.99.162:8080/backend/metricas/aprobacion/ranking/partidos')
        };

    });
