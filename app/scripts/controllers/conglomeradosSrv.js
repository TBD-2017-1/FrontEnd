angular.module('angularSpa')
    .service('conglomeradosService', function($http){
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
/*
  	    this.crearconglomerado = function(nombre,apellido,cuentaTwitter,partidoid,conglomeradoid){
            cong= {"id":7,"nombre":"Independiente"};

            part= {"conglomerado":{"cuentaTwitter":"NuevaMayoriacl","id":2,"nombre":"Nueva MayorÃ­a"},
                    "cuentaTwitter":"PPD_Chile",
                    "id":5,
                    "nombre":"Partido por la Democracia"};


            dataPOST = {"apellido":"Perez", 
                        "conglomerado": cong,                     
                        "cuentaTwitter":"juanitoperez",
                        "nombre":"Juan",
                        "partido": part, 
            }; 

            console.log(dataPOST);
            return $http.post(URL, dataPOST);

            dataPOST= { nombre,
                        apellido,
                        cuentaTwitter,
                        partidoid,
                        conglomeradoid};
            
            console.log(dataPOST);
            return $http.post(URL, dataPOST);

            };
           */
    });