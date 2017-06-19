angular.module('poliTweets')
	.controller('apConglomeradosCtrl', function($scope, $timeout, conglomeradosService){

	// PARA GRAFICO USANDO SERVICIO
		$scope.timeline_data = [];

		$scope.congloChartA;
		$scope.congloPieChartA;
		$scope.congloChartB;

		// arreglos de valores para el grafico chart1
		$scope.names= [];                             // elementos eje y del grafico (participantes)
		$scope.aprob= ['Aprobacion'];                 // aprobación actual de cada participante
		$scope.tasa_pos=[];            // tasa de aprecioaciones positivas actuales
		$scope.tasa_neu=[];             // tasa de aprecioaciones neutrales actuales
		$scope.tasa_neg=[];            // tasa de aprecioaciones negativas actuales
		$scope.tPos= ['Tasa Positiva'];
		$scope.tNeu= ['Tasa Neutral'];
		$scope.tNeg= ['Tasa Negativa'];

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

								$scope.showPieGraphA();
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
			var name_ID_aux = $scope.timeline_data[0].conglomerado.id;	// id pivote
			var j = 0;

			while (j < $scope.timeline_data.length) {                								// buscar cada entidad en el JSON

				var first_name = $scope.timeline_data[j].conglomerado.nombre;

				if(j == 0){
					$scope.names.push( first_name );
				}
				else if( name_ID_aux == $scope.timeline_data[j].conglomerado.id ){
						break;
				}
				else{
					$scope.names.push( first_name );
				}

				var elem_aux= [];
				elem_aux[0] = first_name ;
				$scope.columns_data[j]= elem_aux;

				j += 1;
			}

			// se cargan los elementos del eje x para el grafico chart2
			j= 0;
			var canti_fechas = $scope.timeline_data.length / $scope.names.length;
			if(canti_fechas > 7){
				j += $scope.names.length * (canti_fechas - 7);						// se reducen las fechas a mostrar a 7
			}
			while (j < $scope.timeline_data.length) {                        // por cada fecha en el JSON
				var aux_fecha = $scope.timeline_data[j].fecha;
				var formated_date = aux_fecha.slice(0, 10);
				$scope.dates.push(formated_date);
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
				var canti_fechas = $scope.timeline_data.length / $scope.names.length;
				if(canti_fechas > 7){
					k += $scope.names.length * (canti_fechas - 7);					// se reducen las fechas a mostrar a 7
				}
			  while (k < cantidad_time_data) {												// por cada fecha en el JSON

					var valor;
					valor = $scope.timeline_data[k].valor;
			  	$scope.columns_data[i].push(valor);										// agregar info a la linea temporal de chart2

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.aprob.push(valor);														// agregar tambien a chart1
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
					valor = $scope.timeline_data[k].valor;

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.tasa_pos.push(valor);												// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }

			  i += 1;
			}
			$scope.tPos.push($scope.tasa_pos[i-1]);
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
					valor = $scope.timeline_data[k].valor;

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.tasa_neg.push(valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }

			  i += 1;
			}
			$scope.tNeg.push($scope.tasa_neg[i-1]);
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
					valor = $scope.timeline_data[k].valor;

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.tasa_neu.push(valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }

			  i += 1;
			}
			$scope.tNeu.push($scope.tasa_neu[i-1]);
		}


		$scope.showGraphA = function() {
      $scope.congloChartA = c3.generate({

      	bindto: '#chart1',
        data: {
          columns: [
          $scope.aprob
          ],
          type: 'bar',
          onmouseover: function (d) { $scope.updatePieGraphA(d.index); console.log(d.index);},
        },
        axis: {
          x: {
          	tick: {
	            multiline: false,
	        	},
	          type: 'category',
	          categories: $scope.names,
            label: { // ADD
              text: 'Conglomerados Políticos',
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

    $scope.showPieGraphA = function(){
			$scope.congloPieChartA = c3.generate({
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
		    },
			});
		}

    $scope.updatePieGraphA = function(index){

  		$scope.tNeu[1] = $scope.tasa_neu[index];
      $scope.tPos[1] = $scope.tasa_pos[index];
      $scope.tNeg[1] = $scope.tasa_neg[index];

    	$scope.congloPieChartA.load({
    		
        columns: [
        	$scope.tNeu,
	        $scope.tPos,
	        $scope.tNeg,
        ]
      });
		}

    $scope.showGraphB = function() {
    	//console.log($scope.dates);
    	//console.log($scope.columns_data);

      $scope.congloChartB = c3.generate({

        bindto: '#chart2',
        size: {
	        height: 350
		    },
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
          x: {
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

} );
