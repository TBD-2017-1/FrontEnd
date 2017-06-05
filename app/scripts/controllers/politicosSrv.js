angular.module('poliTweets')
    .service('politicosService', function($location,$http){
    	var URL= 'http://107.170.99.162:8080/backend/politicos';
        this.getPoliticos = function(){
            return $http.get(URL);
        };

        this.crearPolitico = function(politico){
            return $http.post(URL, politico)
            .then(function(){
                $location.url("/adminPoliticos");
                window.location.reload();
            },
            function(){
                console.log(error);
            });
        };

        this.editarPolitico = function(politico, id){
            console.log(id)
            console.log(politico)
            return $http.put('http://107.170.99.162:8080/backend/politicos/' + id, politico);
        };

        this.borrarPolitico = function(politico, id){
            console.log(id)
            console.log(politico)
            return $http.delete('http://107.170.99.162:8080/backend/politicos/' + id, politico)
            .then(function(){
                $location.url("/adminPartidos");
                window.location.reload();
            },
            function(){
                console.log(error);
            });
        };

        this.getPoliticoKeywords = function(id){
            return $http.get('http://107.170.99.162:8080/backend/politicos/'+id+'/keywords');
        };

        this.addKeywordPolitico = function(keyword, id){
            return $http.post('http://107.170.99.162:8080/backend/politicos/'+id+'/addkeyword',keyword)
            .then(function(){
                $location.url("/adminPoliticos");
                window.location.reload();
            },
            function(error){
                console.log(error);
            });
        };

        this.removeKeywordPolitico = function(keywordid, id){
            console.log("id politico:" + id)
            console.log("id keyword:" + keywordid)
            return $http.delete('http://107.170.99.162:8080/backend/politicos/'+id+'/removekeyword/'+keywordid)
            .then(function(){
                $location.url("/adminPoliticos");
                window.location.reload();
            },
            function(){
                console.log("error al borrar");
            });
        };

        this.getPoliApr = function(id){
            var URL1= 'http://107.170.99.162:8080/backend/metricas/aprobacion/politicos/'+id;
            return $http.get(URL1);
        };

        this.getPoliPos = function(id){
            var URL1= 'http://107.170.99.162:8080/backend/metricas/sentimientoPositivo/politicos/'+id;
            return $http.get(URL1);
        };

        this.getPoliNeg = function(id){
            var URL1= 'http://107.170.99.162:8080/backend/metricas/sentimientoNegativo/politicos/'+id;
            return $http.get(URL1);
        };

        this.getPoliNeu = function(id){
            var URL1= 'http://107.170.99.162:8080/backend/metricas/sentimientoNeutro/politicos/'+id;
            return $http.get(URL1);
        };


    });
