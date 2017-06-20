angular.module('poliTweets')
    .service('conglomeradosService', function($http,$location){
    	var URL= 'http://107.170.99.162:8080/backend/conglomerados';
        this.getConglomerados = function(){
            return $http.get(URL);
        };

        this.crearConglomerado = function(conglomerado){
            return $http.post(URL, conglomerado)
            .then(function(){
                $location.url("/adminConglomerados");
                window.location.reload();
            },
            function(){
                console.log(error);
            });
        };

        this.editarConglomerado = function(conglomerado, id){
            return $http.put('http://107.170.99.162:8080/backend/conglomerados/' + id, conglomerado);
        };

        this.borrarConglomerado = function(conglomerado, id){
            console.log(id)
            return $http.delete('http://107.170.99.162:8080/backend/conglomerados/' + id, conglomerado)
            .then(function(){
                $location.url("/adminConglomerados");
                window.location.reload();
            },
            function(){
                console.log(error);
            });
        };

        this.getConglomeradoKeywords = function(id){
            return $http.get('http://107.170.99.162:8080/backend/conglomerados/'+id+'/keywords');
        };

        this.addKeywordConglomerado = function(keyword, id){
            return $http.post('http://107.170.99.162:8080/backend/conglomerados/'+id+'/addkeyword',keyword)
            .then(function(){
                $location.url("/adminConglomerados");
                window.location.reload();
            },
            function(error){
                console.log(error);
            });
        };

        this.removeKeywordConglomerado = function(keywordid, id){
            console.log("id conglomerado:" + id)
            console.log("id keyword:" + keywordid)
            return $http.delete('http://107.170.99.162:8080/backend/conglomerados/'+id+'/removekeyword/'+keywordid)
            .then(function(){
                $location.url("/adminConglomerados");
                window.location.reload();
            },
            function(){
                console.log("error al borrar");
            });
        };

        this.getCongloApr = function(){
            var URL3= 'http://107.170.99.162:8080/backend/metricas/aprobacion/conglomerados';
            return $http.get(URL3);
        };

        this.getCongloPos = function(){
            var URL3= 'http://107.170.99.162:8080/backend/metricas/sentimientoPositivo/conglomerados';
            return $http.get(URL3);
        };

        this.getCongloNeg = function(){
            var URL3= 'http://107.170.99.162:8080/backend/metricas/sentimientoNegativo/conglomerados';
            return $http.get(URL3);
        };

        this.getCongloNeu = function(){
            var URL3= 'http://107.170.99.162:8080/backend/metricas/sentimientoNeutro/conglomerados';
            return $http.get(URL3);
        };

        this.getRanking = function(){
            return $http.get('http://107.170.99.162:8080/backend/metricas/aprobacion/ranking/conglomerados')
        };

    });
