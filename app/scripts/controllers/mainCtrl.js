angular.module('poliTweets')
		.controller('mainCtrl', function($scope, $location, politicosService, partidosService, conglomeradosService){

		$scope.toHome = function(){
			$location.url('/home');
		}
		$scope.toDetailsCongl = function(){
			$location.url('/aprobacionConglomerados');
		}
		$scope.toDetailsPart = function(){
			$location.url('/aprobacionPartidos');
		}
		$scope.toDetailsPolit = function(){
			$location.url('/aprobacionPoliticos');
		}
		$scope.toInfluences = function(){
			$location.url('/influencias');
		}

		$scope.rankPoliGraph;
		$scope.rankPartiGraph;
		$scope.rankCongloGraph;

		$scope.rankPoliData;
		$scope.rankPartiData;
		$scope.rankCongloData;

		$scope.poliNombres = [];
		$scope.partiNombres = [];
		$scope.congloNombres = [];

		$scope.poliValores = ['Aprobación'];
		$scope.partiValores = ['Aprobación'];
		$scope.congloValores = ['Aprobación'];


		/*politicosService.getRanking().then(function(data){
			poli_data = data.data;
			$scope.rankPoliData = poli_data;
			$scope.rankPoliData = data.data;
			var i = 0;
			for ( i in $scope.rankPoliData ){
				$scope.poliNombres.push($scope.rankPoliData[i].nombre);
				$scope.poliValores.push($scope.rankPoliData[i].valor);
			}
			$scope.showRankingPoli();

		}, function(error){
			console.log(error, "error4");
		});


		partidosService.getRanking().then(function(data){
			parti_data = data.data;
			$scope.rankPartiData = parti_data;
			$scope.rankPartiData = data.data;
			var j = 0;
			for ( j in $scope.rankPartiData ){
				$scope.partiNombres.push($scope.rankPartiData[j].nombre);
				$scope.partiValores.push($scope.rankPartiData[j].valor);
			}
			$scope.showRankingParti();

		}, function(error){
			console.log(error, "error4");
		});


		conglomeradosService.getRanking().then(function(data){
			conglo_data = data.data;
			$scope.rankCongloData = conglo_data;
			$scope.rankCongloData = data.data;
			var k = 0;
			for ( k in $scope.rankCongloData ){
				$scope.congloNombres.push($scope.rankCongloData[k].nombre);
				$scope.congloValores.push($scope.rankCongloData[k].valor);
			}
			$scope.showRankingConglo();

		}, function(error){
			console.log(error, "error4");
		});


		// grafico Ranking politicos
		$scope.showRankingPoli = function() {
      $scope.rankPoliGraph = c3.generate({

      	bindto: '#chartPoli',
        data: {
          columns: [
          $scope.poliValores,
          ],
          type: 'bar',
        },
        axis: {
	        x: {
	          tick: {
	            multiline: false,
	        	},
	          type: 'category',

	          categories: $scope.poliNombres,
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

		// grafico Ranking partidos
    $scope.showRankingParti = function() {
      $scope.rankPartiGraph = c3.generate({

      	bindto: '#chartParti',
        data: {
          columns: [
          $scope.partiValores,
          ],
          type: 'bar',
        },
        axis: {
	        x: {
	          tick: {
	            multiline: false,
	        	},
	          type: 'category',

	          categories: $scope.partiNombres,
            label: { // ADD
              text: 'Partidos',
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

		// grafico Ranking conglomerados
    $scope.showRankingConglo = function() {
      $scope.rankCongloGraph = c3.generate({

      	bindto: '#chartConglo',
        data: {
          columns: [
          $scope.congloValores,
          ],
          type: 'bar',
        },
        axis: {
	        x: {
	          tick: {
	            multiline: false,
	        	},
	          type: 'category',

	          categories: $scope.congloNombres,
            label: { // ADD
              text: 'Conglomerados',
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
*/
});
