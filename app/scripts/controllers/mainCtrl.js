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
		$scope.toMapas = function(){
			$location.url('/mapa');
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


		//$scope.loadRankingsMain = function() {
			politicosService.getRanking().then(function(data){

				$scope.rankPoliData = data.data.ranking;
				var i = 0;

				for ( i in $scope.rankPoliData ){
					$scope.poliNombres.push($scope.rankPoliData[i].nombre);
					$scope.poliValores.push($scope.rankPoliData[i].valor);
				}
				$scope.showRankingPoli();

				console.log($scope.rankPoliData);

			}, function(error){
				console.log(error, "error4");
			});


			partidosService.getRanking().then(function(data){
				$scope.rankPartiData = data.data.ranking;
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
				$scope.rankCongloData = data.data.ranking;
				var k = 0;
				for ( k in $scope.rankCongloData ){
					$scope.congloNombres.push($scope.rankCongloData[k].nombre);
					$scope.congloValores.push($scope.rankCongloData[k].valor);
				}
				$scope.showRankingConglo();

			}, function(error){
				console.log(error, "error4");
			});

		//}

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
          	max: 100,
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
          	max: 100,
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
          	max: 100,
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

});
