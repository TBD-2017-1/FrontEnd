(function(){

    angular.module('poliTweets', ['ngRoute','ngCookies','ngResource','ngMaterial','ngMessages'])
    .config(function($routeProvider){
        $routeProvider
        .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
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
          templateUrl:'views/adminPoliticos.html',
          controller:'politicosCtrl'
        })
    .when('/adminConglomerados', {
          templateUrl:'views/adminConglomerados.html',
          controller:'conglomeradosCtrl'
        })
    .when('/adminPoliticos', {
          templateUrl:'views/adminPoliticos.html',
          controller:'politicosCtrl'
        })
    .when('/adminPartidos', {
          templateUrl:'views/adminPartidos.html',
          controller:'partidosCtrl'
        })
    .when('/daemons', {
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


