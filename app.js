var wspa = angular.module('wspa',['ngRoute','ngResource']);

wspa.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    .when('/forecast',{
        templateUrl: 'pages/forecast.html',
        controller: 'weatherController'
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

wspa.controller('weatherController',['$scope','$resource','$log','nameService', function ($scope,$resource,$log,nameService) {
    $scope.cityName = nameService.city; 
    $scope.forecastApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, {get: { method: "JSONP"}});
    $scope.forecastResult = $scope.forecastApi.get({ q: $scope.cityName, cnt:5 , appid:'8247af4320c30be0cffb3d510f263690'});
}]);

