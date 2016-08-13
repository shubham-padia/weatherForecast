var wspa = angular.module('wspa',['ngRoute','ngResource']);

wspa.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    .when('/forecast',{
        templateUrl: 'pages/main.html',
        controller: 'forecastController'
    })
});

wspa.controller('mainController', ['$scope', function ($scope) {

}]);

wspa.controller('forecastController',['$scope', function ($scope) {

}]);

