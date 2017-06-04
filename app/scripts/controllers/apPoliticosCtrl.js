angular.module('poliTweets')
	.controller('apPoliticosCtrl', function($scope, $timeout, politicosService){
	
	// PARA GRÁFICO ESTÁTICO
		//$scope.text ='[{"date":"09-05-2017","info":[{"name":"Felipe Edwards","positive":77,"negative":122,"neutral":13},{"name":"José Ossandón","positive":80,"negative":100,"neutral":12},{"name":"Sebastian Piñera","positive":60,"negative":120,"neutral":10},{"name":"Michelle Bachelete","positive":60,"negative":120,"neutral":7}]},{"date":"10-05-2017","info":[{"name":"Felipe Edwards","positive":80,"negative":110,"neutral":13},{"name":"José Ossandón","positive":90,"negative":120,"neutral":22},{"name":"Sebastian Piñera","positive":20,"negative":150,"neutral":15},{"name":"Michelle Bachelete","positive":40,"negative":170,"neutral":17}]},{"date":"11-05-2017","info":[{"name":"Felipe Edwards","positive":70,"negative":122,"neutral":13},{"name":"José Ossandón","positive":80,"negative":100,"neutral":12},{"name":"Sebastian Piñera","positive":60,"negative":120,"neutral":10},{"name":"Michelle Bachelete","positive":60,"negative":120,"neutral":7}]},{"date":"12-05-2017","info":[{"name":"Felipe Edwards","positive":84,"negative":100,"neutral":13},{"name":"José Ossandón","positive":70,"negative":100,"neutral":12},{"name":"Sebastian Piñera","positive":50,"negative":120,"neutral":10},{"name":"Michelle Bachelete","positive":60,"negative":120,"neutral":7}]},{"date":"13-05-2017","info":[{"name":"Felipe Edwards","positive":73,"negative":98,"neutral":13},{"name":"José Ossandón","positive":80,"negative":111,"neutral":12},{"name":"Sebastian Piñera","positive":70,"negative":120,"neutral":10},{"name":"Michelle Bachelete","positive":60,"negative":120,"neutral":7}]},{"date":"14-05-2017","info":[{"name":"Felipe Edwards","positive":82,"negative":110,"neutral":13},{"name":"José Ossandón","positive":100,"negative":100,"neutral":2},{"name":"Sebastian Piñera","positive":90,"negative":120,"neutral":3},{"name":"Michelle Bachelete","positive":80,"negative":160,"neutral":10}]}]';
		//$scope.timeline_data= JSON.parse($scope.text);
	// PARA GRAFICO USANDO SERVICIO
		$scope.timeline_data = [];

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

		$scope.cargarTimelinePoli = function(){
			
			politicosService.getPoliApr().then(function(data){			
				$scope.timeline_data = data.data;

				$scope.procesarTimeline();
				$scope.procesarApro();

			}, function(error){
				console.log(error, "error1");		
			});
				
/*
			politicosService.getPoliPos().then(function(data){			
				$scope.timeline_data = data.data;

				$scope.procesarPosi();

			}, function(error){
				console.log(error, "error2");		
			});

			politicosService.getPoliNeg().then(function(data){			
				$scope.timeline_data = data.data;

				$scope.procesarNega();

			}, function(error){
				console.log(error, "error3");		
			});

			politicosService.getPoliNeu().then(function(data){			
				$scope.timeline_data = data.data;

				$scope.procesarNeut();

			}, function(error){
				console.log(error, "error4");		
			});
			*/
		}

		$scope.procesarTimeline = function(){
			// preparan valores iniciales para las columnas de chart2 (un arreglo por participante)
			// y para el eje Y de chart1
			var name_ID_aux = $scope.timeline_data[0].politico_metrica.id;	// id pivote
			var j = 0;
			
			for (j in $scope.timeline_data) {                								// buscar cada entidad en el JSON
				
				var first_name = $scope.timeline_data[j].politico_metrica.nombre;
				var last_name = $scope.timeline_data[j].politico_metrica.apellido;
				
				if(j == 0){
					$scope.names.push( first_name +" "+ last_name);
				}
				else if( name_ID_aux == $scope.timeline_data[j].politico_metrica.id ){ 
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
			var date_aux = $scope.timeline_data[0].fecha;
			for (j in $scope.timeline_data) {                        // por cada fecha en el JSON
				if(j == 0)
					$scope.dates.push($scope.timeline_data[j].fecha);
				else if(date_aux == $scope.timeline_data[j].fecha){
					continue;
				}
				else{
					$scope.dates.push($scope.timeline_data[j].fecha);
					date_aux == $scope.timeline_data[j].fecha;
				}
			}
		}

		$scope.procesarApro = function(){
			var i = 0;
			var k = 0;
			// completa la informacion de las columnas de chart 2
			var cantidad_entidades = $scope.names.length;
			var cantidad_time_data = $scope.timeline_data.length;
			for (i in $scope.columns_data) {													// por cada entidad registrada
				k = i;
			  while (k < cantidad_time_data) {												// por cada fecha en el JSON
			  	
					console.log(k);
					console.log($scope.timeline_data[k]);

			  	var valor = $scope.timeline_data[k].valor;

			  	$scope.columns_data[i].push(valor);		// agregar info a la linea temporal de chart2

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.aprob.push($scope.timeline_data[k].valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }
			}
		}

		$scope.procesarPosi = function(){
			var i= 0;
			var k= 0;
			// completa la informacion de las columnas de chart 2
			var cantidad_entidades = $scope.names.length;
			var cantidad_time_data = $scope.timeline_data.length;
			for (i in $scope.columns_data) {													// por cada entidad registrada
				k = i;
			  while (k < cantidad_time_data) {												// por cada fecha en el JSON
			  	
					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.tasa_pos.push($scope.timeline_data[k].valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }
			}
		}

		$scope.procesarNega = function(){
			var i= 0;
			var k= 0;
			// completa la informacion de las columnas de chart 2
			var cantidad_entidades = $scope.names.length;
			var cantidad_time_data = $scope.timeline_data.length;
			for (i in $scope.columns_data) {													// por cada entidad registrada
				k = i;
			  while (k < cantidad_time_data) {												// por cada fecha en el JSON
			  	
			  	$scope.columns_data[i].push($scope.timeline_data[k].valor);		// agregar info a la linea temporal de chart2

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.tasa_neg.push($scope.timeline_data[k].valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }
			}
		}

		$scope.procesarNeut = function(){
			var i = 0;
			var k = 0;
			// completa la informacion de las columnas de chart 2
			var cantidad_entidades = $scope.names.length;
			var cantidad_time_data = $scope.timeline_data.length;
			for (i in $scope.columns_data) {													// por cada entidad registrada
				k = i;
			  while (k < cantidad_time_data) {												// por cada fecha en el JSON
			  	
			  	$scope.columns_data[i].push($scope.timeline_data[k].valor);		// agregar info a la linea temporal de chart2

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.tasa_neu.push($scope.timeline_data[k].valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }
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
              text: 'Conglomerados',
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

});