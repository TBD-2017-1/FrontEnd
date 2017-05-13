angular.module('angularSpa')
    .service('politicosService', function($http){
    	var URL= 'http://localhost:8080/backend/politicos';
        this.getPoliticos = function(){ 
            return $http.get(URL);
        };

  	    this.crearPolitico = function(nombre1,apellido1,cuentaTwitter1,partido1,conglomerado1){         
           var request = $http({
                method: "POST",
                url: "http://localhost:8080/backend/politicos",
                data: {
                    apellido: apellido1,
                    cuentaTwitter: cuentaTwitter1,
                    nombre: nombre1,
                    conglomerado: conglomerado1,
                    partido: partido1
                    },
                headers: {'Content-Type': 'application/json'}
                });
                return (request);
            };
           
    });