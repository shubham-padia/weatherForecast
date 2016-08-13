var wspa = angular.module('wspa',['ngRoute','ngResource']);

wspa.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    .when('/forecast',{
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});

wspa.service('nameService',function(){
    this.city = "";
});

wspa.controller('mainController', ['$scope','nameService', function ($scope,nameService) {
    $scope.cityName = nameService.city;
    $scope.$watch('cityName',function(){
          nameService.city = $scope.cityName;
      });
}]);

wspa.controller('forecastController',['$scope','nameService', function ($scope,nameService) {
    $scope.cityName = nameService.city; 
    console.log($scope.cityName);
}]);

