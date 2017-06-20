(function(){

    angular.module('poliTweets', ['ngRoute','ngCookies','ngResource','ngMaterial','ngMessages', 'duScroll'])
    .config(function($routeProvider){
        $routeProvider
        .when('/home', {
        templateUrl: 'views/main.html',
        //controller: 'mainCtrl'
      })
    .when('/aprobacionPartidos', {
        templateUrl: 'views/aprobacionPartidos.html',
        controller: 'apPartidosCtrl'
      })
    .when('/aprobacionConglomerados', {
        templateUrl: 'views/aprobacionConglomerados.html',
        controller: 'apConglomeradosCtrl'
      })
    .when('/aprobacionPoliticos', {
        templateUrl: 'views/aprobacionPoliticos.html',
        controller: 'apPoliticosCtrl'
      })
    .when('/admin', {
          resolve: {
            "check": function($location,$cookies){
              if (!$cookies.get('sesion')){
                $location.path('/');
              }
            }
          },
          templateUrl:'views/adminPoliticos.html',
          controller:'politicosCtrl'
        })
    .when('/adminConglomerados', {
          resolve: {
            "check": function($location,$cookies){
              if (!$cookies.get('sesion')){
                console.log($cookies.get('sesion'));
                $location.path('/');
              }
            }
          },
          templateUrl:'views/adminConglomerados.html',
          controller:'conglomeradosCtrl'
        })
    .when('/adminPoliticos', {
          resolve: {
            "check": function($location,$cookies){
              if (!$cookies.get('sesion')){
                console.log($cookies.get('sesion'));
                $location.path('/');
              }
            }
          },
          templateUrl:'views/adminPoliticos.html',
          controller:'politicosCtrl'
        })
    .when('/adminPartidos', {
          resolve: {
            "check": function($location,$cookies){
              if (!$cookies.get('sesion')){
                console.log($cookies.get('sesion'));
                $location.path('/');
              }
            }
          },
          templateUrl:'views/adminPartidos.html',
          controller:'partidosCtrl'
        })
    .when('/daemons', {
          resolve: {
            "check": function($location,$cookies){
              if (!$cookies.get('sesion')){
                console.log($cookies.get('sesion'));
                $location.path('/');
              }
            }
          },
          templateUrl:'views/daemons.html',
          controller:'daemonsCtrl'
        })
    .when('/rankingPartidos', {
          templateUrl:'views/rankingPartidos.html',
          controller:'partidosCtrl'
        })
    .when('/rankingConglomerados', {
          templateUrl:'views/rankingConglomerados.html',
          controller:'conglomeradosCtrl'
        })
    .when('/rankingPoliticos', {
          templateUrl:'views/rankingPoliticos.html',
          controller:'politicosCtrl'
        })
    .when('/influencias', {
          templateUrl:'views/influencias.html',
          controller:'politicosCtrl'
        })
    .otherwise({
        redirectTo: '/home'
      });
    });

})();
