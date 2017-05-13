(function(){

    angular.module('angularSpa', ['ngRoute','ngCookies','ngResource'])
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
    .otherwise({
        redirectTo: '/home'
      });
    });

})();


