angular.module('poliTweets')
	.controller('apConglomeradosCtrl', function($scope, $timeout, conglomeradosService){

	// PARA GRÁFICO ESTÁTICO
		//$scope.text ='[{"date":"09-05-2017","info":[{"name":"Alternativa Democrática","positive":77,"negative":122,"neutral":13},{"name":"Chile Vamos","positive":80,"negative":100,"neutral":12},{"name":"Nueva Mayoría","positive":60,"negative":120,"neutral":10},{"name":"Sentido Futuro","positive":60,"negative":120,"neutral":7}]},{"date":"10-05-2017","info":[{"name":"Alternativa Democrática","positive":80,"negative":110,"neutral":13},{"name":"Chile Vamos","positive":90,"negative":120,"neutral":22},{"name":"Nueva Mayoría","positive":20,"negative":150,"neutral":15},{"name":"Sentido Futuro","positive":40,"negative":170,"neutral":17}]},{"date":"11-05-2017","info":[{"name":"Alternativa Democrática","positive":70,"negative":122,"neutral":13},{"name":"Chile Vamos","positive":80,"negative":100,"neutral":12},{"name":"Nueva Mayoría","positive":60,"negative":120,"neutral":10},{"name":"Sentido Futuro","positive":60,"negative":120,"neutral":7}]},{"date":"12-05-2017","info":[{"name":"Alternativa Democrática","positive":84,"negative":100,"neutral":13},{"name":"Chile Vamos","positive":70,"negative":100,"neutral":12},{"name":"Nueva Mayoría","positive":50,"negative":120,"neutral":10},{"name":"Sentido Futuro","positive":60,"negative":120,"neutral":7}]},{"date":"13-05-2017","info":[{"name":"Alternativa Democrática","positive":73,"negative":98,"neutral":13},{"name":"Chile Vamos","positive":80,"negative":111,"neutral":12},{"name":"Nueva Mayoría","positive":70,"negative":120,"neutral":10},{"name":"Sentido Futuro","positive":60,"negative":120,"neutral":7}]},{"date":"14-05-2017","info":[{"name":"Alternativa Democrática","positive":82,"negative":110,"neutral":13},{"name":"Chile Vamos","positive":100,"negative":100,"neutral":2},{"name":"Nueva Mayoría","positive":90,"negative":120,"neutral":3},{"name":"Sentido Futuro","positive":80,"negative":160,"neutral":10}]}]';
		//$scope.timeline_data= JSON.parse($scope.text);
	// PARA GRAFICO USANDO SERVICIO
		$scope.timeline_data= [];		


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

		// auxiliares para calcular aprobacion y apreciaciones
		$scope._posi;                  // cantidad de aprecioaciones positivas por fecha
		$scope._neut;                  // cantidad de aprecioaciones neutrales por fecha
		$scope._nega;                  // cantidad de aprecioaciones negativas por fecha
		$scope.total_muestra= [];      // historial de muestras totales por fecha

		var i;
		var j;
		var k;


		$scope.procesarTimeline = function(){

			// prepara valores iniciales para las columnas de chart2 (un arreglo por participante)
			for (j in $scope.timeline_data[0].info) {                // por cada participante en el JSON
				$scope.names.push($scope.timeline_data[0].info[j].name);

				$scope.elem_aux= [$scope.timeline_data[0].info[j].name];
				$scope.columns_data[j]=$scope.elem_aux;
			}

			// se cargan los elementos del eje x para el grafico chart2
			j= 0;
			for (j in $scope.timeline_data) {                        // por cada fecha en el JSON
				$scope.dates.push($scope.timeline_data[j].date);
			}

			// completa la informacion de las columnas de chart 2
			for (i in $scope.columns_data) {                         // para cada participante en el JSON

				k = 0;
			  for (k in $scope.timeline_data) {                      // por cada fecha en el JSON
			  	$scope._posi= $scope.timeline_data[k].info[i].positive;
			    $scope._neut= $scope.timeline_data[k].info[i].neutral;      // almacenar apreciaciones
			    $scope._nega= $scope.timeline_data[k].info[i].negative;

			    $scope.total_individual= $scope._posi + $scope._neut + $scope._nega;  // total aprec. para este participante en una fecha

			    if($scope.total_muestra[k] == null){
			      $scope.total_muestra[k]= $scope.total_individual;         // guardar total de aprec. en la fecha
			    }
			    else{
			      $scope.total_muestra[k]+= $scope.total_individual;        // o bien, sumarlo al total de aprec. en la fecha
			    }

			    $scope.aux_aprob= 0.5 + 0.5*($scope._posi/ $scope.total_individual - $scope._nega/ $scope.total_individual);

			    $scope.columns_data[i].push($scope.aux_aprob*100);          // establecer aprob de un participante en la fecha

			    if(k == ($scope.timeline_data.length - 1)){          // si se trata de la ultima fecha registrada

			    	$scope.tasa_neg.push(($scope._nega / $scope.total_individual)*100);
			      $scope.tasa_neu.push(($scope._neut / $scope.total_individual)*100);   // guardar ultimos datos de aprec de los participantes
			      $scope.tasa_pos.push(($scope._posi / $scope.total_individual)*100);
			      $scope.aprob.push($scope.aux_aprob*100);

			    }
			  }
			}
		}

		$scope.cargarTimelineConglo = function(){
			conglomeradosService.getCongloTimeline().then(function(data){
				$scope.timeline_data= data;
				//$scope.procesarTimeline();
				console.log($scope.timeline_data);	
			}, function(error){
				console.log(error, "error3");	
			});
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

} );