angular.module('poliTweets')
    .service('politicosService', function($location,$http){
    	var URL= 'http://localhost:8080/backend/politicos';
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
            return $http.put('http://localhost:8080/backend/politicos/' + id, politico);
        };

        this.borrarPolitico = function(politico, id){
            console.log(id)
            console.log(politico)
            return $http.delete('http://localhost:8080/backend/politicos/' + id, politico)
            .then(function(){
                $location.url("/adminPartidos");
                window.location.reload();
            },
            function(){
                console.log(error);
            });
        };

        this.getPoliticoKeywords = function(id){ 
            return $http.get('http://localhost:8080/backend/politicos/'+id+'/keywords');
        };

        this.addKeywordPolitico = function(keyword, id){
            return $http.post('http://localhost:8080/backend/politicos/'+id+'/addkeyword',keyword)
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
            return $http.delete('http://localhost:8080/backend/politicos/'+id+'/removekeyword/'+keywordid)
            .then(function(){
                $location.url("/adminPoliticos");
                window.location.reload();
            },
            function(){
                console.log("error al borrar");
            });
        };

        this.getPoliApr = function(){ 
            var URL1= 'http://localhost:8080/backend/metricas/aprobacion/politicos';
            return $http.get(URL1);
        };

        this.getPoliPos = function(){ 
            var URL1= 'http://localhost:8080/backend/metricas/sentimientoPositivo/politicos';
            return $http.get(URL1);
        };

        this.getPoliNeg = function(){ 
            var URL1= 'http://localhost:8080/backend/metricas/sentimientoNegativo/politicos';
            return $http.get(URL1);
        };

        this.getPoliNeu = function(){ 
            var URL1= 'http://localhost:8080/backend/metricas/sentimientoNeutro/politicos';
            return $http.get(URL1);
        };


    });