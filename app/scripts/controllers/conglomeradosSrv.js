angular.module('poliTweets')
    .service('conglomeradosService', function($http,$location){
    	var URL= 'http://localhost:8080/backend/conglomerados';
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
            return $http.put('http://localhost:8080/backend/conglomerados/' + id, conglomerado);
        };

        this.borrarConglomerado = function(conglomerado, id){
            console.log(id)
            return $http.delete('http://localhost:8080/backend/conglomerados/' + id, conglomerado)
            .then(function(){
                $location.url("/adminConglomerados");
                window.location.reload();
            },
            function(){
                console.log(error);
            });
        };

        this.addKeywordConglomerado = function(keyword, id){
            return $http.post('http://localhost:8080/backend/conglomerados/'+id+'/addkeyword',keyword)
            .then(function(){
                console.log(keyword);
                console.log(id);
                $location.url("/adminConglomerados");
                window.location.reload();
            },
            function(){
                console.log(error);
            });
        };

    });