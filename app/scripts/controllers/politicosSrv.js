angular.module('angularSpa')
    .service('politicosService', function($http){
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

    });