angular.module('poliTweets')
	.controller('apPoliticosCtrl', function($scope, $timeout, politicosService, partidosService){
	// COMBOBOX
		$scope.partidos = [];
		$scope.partidoSeleccionado = {};
		$scope.politicos = [];
		$scope.politicoSeleccionado = {};
		$scope.setID = {};
		$scope.empty = false;
		$scope.show = false;

	// PARA GRAFICO USANDO SERVICIO
		$scope.timeline_data = [] ;

		$scope.poliChartA;
		$scope.poliPieChartA;
		$scope.poliChartB;

		// arreglos de valores para el grafico chart1
		$scope.names= [];                             // elementos eje y del grafico (participantes)
		$scope.aprob= ['Aprobacion'];                 // aprobación actual de cada participante
		$scope.tasa_pos=['Tasa Positiva'];            // tasa de aprecioaciones positivas actuales
		$scope.tasa_neu=['Tasa Neutral'];             // tasa de aprecioaciones neutrales actuales
		$scope.tasa_neg=['Tasa Negativa'];            // tasa de aprecioaciones negativas actuales

		// arreglos de valores para el grafico chart2
		$scope.dates=[];               // elementos eje x del grafico (fechas)
		$scope.columns_data=[];        // historial de aprobacion de cada participante

		function Politicos(){

			partidosService.getPartidos().then(function(data){
				$scope.partidos = data;
			}, function(error){
			});

			politicosService.getPoliticos().then(function(data){
				$scope.politicos = data;
			}, function(error){
			});

		}
		Politicos();

	$scope.showAllGraphs = function(){
		$scope.show = true;
	}

	$scope.setPolitico = function(politico){
				$scope.politicoSeleccionado = politico;
				$scope.setID = politico.id;
				console.log($scope.setID);

				politicosService.getPoliApr($scope.setID).then(function(data){
					var time_data = data.data;
					$scope.timeline_data = time_data;
					$scope.iniciarTimeline();

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

									$scope.showGraphA();
									$scope.showpieGraphA();
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


		$scope.iniciarTimeline = function(){
			// preparan valores iniciales para las columnas de chart2 (un arreglo por participante)
			// y para el eje Y de chart1
			var name_ID_aux = $scope.timeline_data[0].politico.id;	// id pivote
			var j = 0;

			for (j in $scope.timeline_data) {                								// buscar cada entidad en el JSON

				var first_name = $scope.timeline_data[j].politico.nombre;
				var last_name = $scope.timeline_data[j].politico.apellido;

				if(j == 0){
					$scope.names.push( first_name +" "+ last_name);
				}
				else if( name_ID_aux == $scope.timeline_data[j].politico.id ){
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
				var aux_fecha = $scope.timeline_data[j].fecha;
				var formated_date = aux_fecha.slice(0, 10);
				$scope.dates.push(formated_date);
				//$scope.dates.push($scope.timeline_data[j].fecha);
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
					valor = $scope.timeline_data[k].valor;
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
					valor = $scope.timeline_data[k].valor;

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
					valor = $scope.timeline_data[k].valor;

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
					valor = $scope.timeline_data[k].valor;

					if((k + cantidad_entidades) >= cantidad_time_data){		// si es el ultimo dato que registra la entidad
						$scope.tasa_neu.push(valor);		// agregar tambien a chart1
					}

					k += cantidad_entidades;
			  }

			  i += 1;
			}
		}


		$scope.showGraphA = function() {
      $scope.poliChartA = c3.generate({

      	bindto: '#chart1',
        data: {
          columns: [
          $scope.aprob
          ],
          type: 'bar',
          order: null,
		      onclick: function (d) { console.log(d); },
        },
        axis: {
	        x: {
	          tick: {
	            multiline: false,
	        	},
	          type: 'category',
	          categories: $scope.names,
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


		$scope.showpieGraphA = function(){
			$scope.poliPieChartA = c3.generate({
	    	bindto: '#chart1-b',
	    	data: {
		      // iris data from R
		      columns: [
	        $scope.tasa_neu,
	        $scope.tasa_pos,
	        $scope.tasa_neg
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

    $scope.showGraphB = function() {
    	//console.log($scope.dates);
    	//console.log($scope.columns_data);

      $scope.poliChartB = c3.generate({

        bindto: '#chart2',
        data: {
          columns: $scope.columns_data
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

});
