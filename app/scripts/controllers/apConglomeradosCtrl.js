angular.module('poliTweets')
	.controller('apConglomeradosCtrl', function($scope, $timeout, conglomeradosService){

	// PARA GRAFICO USANDO SERVICIO
		$scope.timeline_data = [] ;

		$scope.chartA;
		$scope.chartB;

		// arreglos de valores para el grafico chart1
		$scope.names= [];                             // elementos eje y del grafico (participantes)
		$scope.aprob= ['Aprobacion'];                 // aprobación actual de cada participante
		$scope.tasa_pos=['Tasa Positiva'];            // tasa de aprecioaciones positivas actuales
		$scope.tasa_neu=['Tasa Neutral'];             // tasa de aprecioaciones neutrales actuales
		$scope.tasa_neg=['Tasa Negativa'];            // tasa de aprecioaciones negativas actuales

		// arreglos de valores para el grafico chart2
		$scope.dates=[];               // elementos eje x del grafico (fechas)
		$scope.columns_data=[];        // historial de aprobacion de cada participante

		function cargarTimeline(){
			conglomeradosService.getCongloApr().then(function(data){
				var time_data = data.data;
				$scope.timeline_data = time_data;
				$scope.iniciarTimeline();

				conglomeradosService.getCongloApr().then(function(data){
					var time_data = data.data;
					$scope.timeline_data = time_data;
					$scope.procesarApro();

					conglomeradosService.getCongloPos().then(function(data){
						time_data = data.data;
						$scope.timeline_data = time_data;
						$scope.procesarPosi();

						conglomeradosService.getCongloNeg().then(function(data){
							time_data = data.data;
							$scope.timeline_data = time_data;
								$scope.procesarNega();

							conglomeradosService.getCongloNeu().then(function(data){
								time_data = data.data;
								$scope.timeline_data = time_data;
								$scope.procesarNeut();

								$scope.showGraphA();
								$scope.showGraphB();

							}, function(error){
								console.log(error, "error4");
							});

						}, function(error){
							console.log(error, "error3");
						});

					}, function(error){
						console.log(error, "error2");
					});

				}, function(error){
					console.log(error, "error1");
				});

			}, function(error){
				console.log(error, "error1");
			});
		}
		cargarTimeline();


		$scope.iniciarTimeline = function(){
			// preparan valores iniciales para las columnas de chart2 (un arreglo por participante)
			// y para el eje Y de chart1
			var name_ID_aux = $scope.timeline_data[0].conglomerado_metrica.id;	// id pivote
			var j = 0;
			
			for (j in $scope.timeline_data) {                								// buscar cada entidad en el JSON
				
				var first_name = $scope.timeline_data[j].conglomerado_metrica.nombre;
				var last_name = $scope.timeline_data[j].conglomerado_metrica.apellido;
				
				if(j == 0){
					$scope.names.push( first_name +" "+ last_name);
				}
				else if( name_ID_aux == $scope.timeline_data[j].conglomerado_metrica.id ){ 
						break;
				}
				else{
					$scope.names.push( first_name +" "+ last_name);
				}

				var elem_aux= [];
				elem_aux[0] = first_name +" "+ last_name;
				$scope.columns_data[j]= elem_aux;
			}

			// se cargan los elementos del eje x para el grafico chart2
			j= 0;
			while (j < $scope.timeline_data.length) {                        // por cada fecha en el JSON
				$scope.dates.push($scope.timeline_data[j].fecha);
				j += $scope.names.length;
			}
		}


		$scope.procesarApro = function(){
			// completa la informacion de las columnas de chart 2
			var cantidad_entidades = $scope.names.length;
			var cantidad_time_data = $scope.timeline_data.length;
			var i = 0;
			while (i < cantidad_entidades) {													// por cada entidad registrada
				
				var k = i;
			  while (k < cantidad_time_data) {												// por cada fecha en el JSON
					
					var valor;
					valor = $scope.timeline_data[k].valor / 100;
			  	$scope.columns_data[i].push(valor);		// agregar info a la linea temporal de chart2

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.aprob.push(valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }

			  i += 1;
			}
		}

		$scope.procesarPosi = function(){
			// completa la informacion de las columnas de chart 2
			var cantidad_entidades = $scope.names.length;
			var cantidad_time_data = $scope.timeline_data.length;
			var i = 0;
			while (i < cantidad_entidades) {													// por cada entidad registrada
				
				var k = i;
			  while (k < cantidad_time_data) {												// por cada fecha en el JSON
					
					var valor;
					valor = $scope.timeline_data[k].valor / 100;

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.tasa_pos.push(valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }
			  
			  i += 1;
			}
		}

		$scope.procesarNega = function(){
			// completa la informacion de las columnas de chart 2
			var cantidad_entidades = $scope.names.length;
			var cantidad_time_data = $scope.timeline_data.length;
			var i = 0;
			while (i < cantidad_entidades) {													// por cada entidad registrada
				
				var k = i;
			  while (k < cantidad_time_data) {												// por cada fecha en el JSON
					
					var valor;
					valor = $scope.timeline_data[k].valor / 100;

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.tasa_neg.push(valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }
			  
			  i += 1;
			}
		}

		$scope.procesarNeut = function(){
			// completa la informacion de las columnas de chart 2
			var cantidad_entidades = $scope.names.length;
			var cantidad_time_data = $scope.timeline_data.length;
			var i = 0;
			while (i < cantidad_entidades) {													// por cada entidad registrada
				
				var k = i;
			  while (k < cantidad_time_data) {												// por cada fecha en el JSON
					
					var valor;
					valor = $scope.timeline_data[k].valor / 100;

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.tasa_neu.push(valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }
			  
			  i += 1;
			}
		}


		$scope.showGraphA = function() {
      $scope.chartA = c3.generate({

      	bindto: '#chart1',
        data: {
          columns: [
          $scope.aprob
          ],
          type: 'bar',
        },
        axis: {
          x: {
          type: 'category',
          categories: $scope.names,
            label: { // ADD
              text: 'Políticos',
              position: 'outer-middle'
            }
          },
          y: {
            label: { // ADD
              text: 'Porcentaje',
              position: 'outer-middle'
            }
          },
          rotated: true
        }
      	
      });     
    }

    $scope.updateGraphA = function(){
    	$scope.chartA.load({
        columns: [
        $scope.tasa_neu,
        $scope.tasa_pos,
        $scope.tasa_neg
        ]
      });

      $scope.chartA.groups([['Tasa Negativa', 'Tasa Positiva', 'Tasa Neutral' ]]);
		}
    
    $scope.showGraphB = function() {
    	console.log($scope.dates);
    	console.log($scope.columns_data);

      $scope.chartB = c3.generate({

        bindto: '#chart2',
         data: {
          columns: $scope.columns_data
        },
        axis: {
          y: {
            label: { // ADD
              text: 'Porcentaje de Aprobación',
              position: 'outer-middle'
            }
          },
          x: {
            type: 'category',
            categories: $scope.dates,
            label: { // ADD
              text: 'Fecha',
              position: 'outer-middle'
            }
          }
        }
      });
    }
    
		$timeout($scope.updateGraphA, 3000);

} );
