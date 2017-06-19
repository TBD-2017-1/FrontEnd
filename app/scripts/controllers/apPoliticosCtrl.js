angular.module('poliTweets')
	.controller('apPoliticosCtrl', function($scope, $timeout, politicosService, partidosService){
	// COMBOBOX
		$scope.partidos = [];
		$scope.partidoSeleccionado = {};
		$scope.politicos = [];
		$scope.politicoSeleccionado = {};
		$scope.setID = -1;
		$scope.setID2 = -1;
		$scope.empty = true;

	// PARA GRAFICO USANDO SERVICIO
		$scope.timeline_data = [] ;

		$scope.poliChartA;
		$scope.poliPieChartA;
		$scope.poliChartB;

		// arreglos de valores para el grafico chart1
		$scope.names= [];                             // elementos eje y del grafico (participantes)
		$scope.aprob= ['Aprobacion'];                 // aprobación actual de cada participante
		$scope.tasa_pos=[];            // tasa de aprecioaciones positivas actuales
		$scope.tasa_neu=[];             // tasa de aprecioaciones neutrales actuales
		$scope.tasa_neg=[];            // tasa de aprecioaciones negativas actuales
		$scope.tPos= ['Tasa Positiva', 0];
		$scope.tNeu= ['Tasa Neutral', 0];
		$scope.tNeg= ['Tasa Negativa', 0];

		// arreglos de valores para el grafico chart2
		$scope.dates=[];               // elementos eje x del grafico (fechas)
		$scope.columns_data=[];        // historial de aprobacion de cada participante

			
		partidosService.getPartidos().then(function(data){		// se obtienen los datos para combobox partidos
			$scope.partidos = data;
		}, function(error){
		});

		politicosService.getPoliticos().then(function(data){	// se obtienen datos para combobox politicos
			$scope.politicos = data;
		}, function(error){
		});



		$scope.loadPolitico = function(politico){
			if(politico.id != $scope.setID){
				$scope.politicoSeleccionado = politico;
				$scope.setID = politico.id;
				console.log($scope.setID);
	
				politicosService.getPoliApr($scope.setID).then(function(data){
					var time_data = data.data;
					$scope.timeline_data = time_data;
					$scope.procesarApro();

					politicosService.getPoliPos($scope.setID).then(function(data){
						time_data = data.data;
						$scope.timeline_data = time_data;
						$scope.procesarPosi();

						politicosService.getPoliNeg($scope.setID).then(function(data){
							time_data = data.data;
							$scope.timeline_data = time_data;
							$scope.procesarNega();

							politicosService.getPoliNeu($scope.setID).then(function(data){
								time_data = data.data;
								$scope.timeline_data = time_data;
								$scope.procesarNeut();

								//console.log($scope.names);

								if($scope.empty == true){

									$scope.showGraphA();
									$scope.showPieGraphA();
									$scope.showGraphB();

									$scope.empty = false;
								}
								else{

									var index = $scope.names.length - 1;
									$scope.updateGraphA(index);
									$scope.updatePieGraphA(index);
									$scope.updateGraphB(index);
								}
									

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
			}
		}

		$scope.loadPartido = function(partido){
			$scope.partidoSeleccionado = partido;

			if($scope.setID2 != partido.id){

				if($scope.empty == false){
					$scope.empty = true;

					delete $scope.poliChartA;
					delete $scope.poliPieChartA;
					delete $scope.poliChartB;
				}

				$scope.setID2 = partido.id;
				var total_poli = $scope.politicos.data.length;
				var count = 0;
				while(count < total_poli){
					if(typeof $scope.politicos.data[count].partido.id != 'undefined'){
						if($scope.setID2 == $scope.politicos.data[count].partido.id){
							var aux_politico = $scope.politicos.data[count];
							$scope.loadPolitico(aux_politico);
						}
					}
					count += 1;
				}
			}

		}


		$scope.procesarApro = function(){
			// completa la informacion de las columnas de chart 2
			var canti_fechas = $scope.timeline_data.length;
			var j = 0;
			var k = 0;

			if(canti_fechas > 7){																				// se reducen las fechas a mostrar a 7
				j += canti_fechas - 7;
				k += canti_fechas - 7;
			}

			if($scope.empty == true){																		// si es la primera llamada a la función
				while (j < canti_fechas) {                   							// se crea el arreglo de fechas (eje x chart2)
					var aux_fecha = $scope.timeline_data[j].fecha;
					var formated_date = aux_fecha.slice(0, 10);
					$scope.dates.push(formated_date);
					j += 1;
				}
			}

			var first_name = $scope.timeline_data[0].politico.nombre;
			var last_name = $scope.timeline_data[0].politico.apellido;

			var elem_aux= [];
			elem_aux[0] = first_name +" "+ last_name;
			$scope.names.push( elem_aux[0] );														// se agrega la entidad a la lista (eje y chartA)
			
			$scope.columns_data.push(elem_aux);														// se agrega la entidad al timeline (data chartB)


			// se cargan los valores de aprobacion al timeline de la entidad
		  while (k < canti_fechas) {																	// por cada fecha en el JSON
				var valor = $scope.timeline_data[k].valor;
				var index = $scope.names.length - 1;
		  	$scope.columns_data[index].push(valor);										// agregar info a la linea temporal de chart2

				if((k + 1) >= canti_fechas){															// si es el ultimo dato que registra la entidad
					$scope.aprob.push(valor);																// agregar tambien a chart1
				}
				k += 1;
		  }
		}

		$scope.procesarPosi = function(){
			// completa la informacion de las columnas de chart 2
			var cantidad_time_data = $scope.timeline_data.length;

			var valor = $scope.timeline_data[cantidad_time_data - 1].valor;

			$scope.tasa_pos.push(valor);		// agregar tambien a chart1
			$scope.tPos[1] = valor;
		}

		$scope.procesarNega = function(){
			// completa la informacion de las columnas de chart 2
			var cantidad_time_data = $scope.timeline_data.length;

			var valor = $scope.timeline_data[cantidad_time_data - 1].valor;

			$scope.tasa_neg.push(valor);		// agregar tambien a chart1
			$scope.tNeg[1] = valor;
		}

		$scope.procesarNeut = function(){
			// completa la informacion de las columnas de chart 2
			var cantidad_time_data = $scope.timeline_data.length;

			var valor = $scope.timeline_data[cantidad_time_data - 1].valor;

			$scope.tasa_neu.push(valor);		// agregar tambien a chart1
			$scope.tNeu[1] = valor;
		}


		$scope.showGraphA = function() {
      $scope.poliChartA = c3.generate({

      	bindto: '#chart1',
        data: {
          columns: [
          $scope.aprob,
          //['Aprobacion', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          type: 'bar',
		      onmouseover: function (d) { $scope.updatePieGraphA(d.index);},
        },
        axis: {
	        x: {
	          tick: {
	            multiline: false,
	        	},
	          type: 'category',

	          categories: $scope.names,
	          //categories: [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','aa','bb','cc','dd'],
            label: { // ADD
              text: 'Políticos',
              position: 'outer-middle'
            }
          },
          y: {
          	tick: {
							values: [ 0, 20, 40, 60, 80, 100],
	        	},
            label: { // ADD
              text: 'Porcentaje',
              position: 'outer-middle'
            }
          },
          rotated: true
        }

      });
    }

    $scope.updateGraphA = function(index){

	    	$scope.poliChartA.load({
	    		
	        columns: [
	        	$scope.aprob,
	        ],
	        categories : $scope.names,

	      });
		}

		$scope.showPieGraphA = function(){
			$scope.poliPieChartA = c3.generate({
	    	bindto: '#chart1-b',
	    	title: {
				  text: 'Valoraciones Registradas',
				},
	    	data: {
		      // iris data from R
		      columns: [
	        $scope.tNeu,
	        $scope.tPos,
	        $scope.tNeg
		      ],
		      type : 'pie',
		      //onclick: function (d, i) { console.log("onclick", d, i); },
		      //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
		      //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
		    },
		    color: {
		      pattern: ['#848f94', '#5fa752', '#d51c2a']
		    }
			});
		}

		$scope.updatePieGraphA = function(index){

  		$scope.tNeu[1] = $scope.tasa_neu[index];
      $scope.tPos[1] = $scope.tasa_pos[index];
      $scope.tNeg[1] = $scope.tasa_neg[index];

    	$scope.poliPieChartA.load({
    		
        columns: [
        	$scope.tNeu,
	        $scope.tPos,
	        $scope.tNeg,
        ]
      });
		}

    $scope.showGraphB = function() {
    	console.log($scope.dates);
    	console.log($scope.columns_data);

      $scope.poliChartB = c3.generate({

        bindto: '#chart2',
        data: {
          columns: $scope.columns_data,
        },
        axis: {
          y: {
          	tick: {
							values: [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
	        	},
            label: { // ADD
              text: 'Porcentaje de Aprobación',
              position: 'outer-middle'
            }
          },
          x:{
          	tick: {
            	multiline: false,
        		},
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

    $scope.updateGraphB = function(index){

	    	$scope.poliChartB.load({
	    		
	        columns: $scope.columns_data,
	        categories : $scope.dates,

	      });
		}

});
