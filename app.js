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
    .when('/forecast/:daysNo',{
        templateUrl:'pages/forecast.html',
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

wspa.controller('weatherController',['$scope','$resource','$log','$routeParams','nameService', function ($scope,$resource,$log,$routeParams,nameService) {
    var dayRange = [];
    for(var j = 1; j < 6 ; j++){
        dayRange.push(j);
    }
    $scope.dayRange = dayRange;

    $scope.cityName = nameService.city;
    $scope.daysNo = $routeParams.daysNo || 1;

    $scope.forecastApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, {get: { method: "JSONP"}});
    $scope.forecastResult = $scope.forecastApi.get({ q: $scope.cityName, cnt:$scope.daysNo , appid:'8247af4320c30be0cffb3d510f263690'});
    
    $scope.convertToCelcius = function(degK) {
        return  Math.round(degK - 273.15) ;
    }
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000); 
    }
    
}]);

wspa.directive('wspaResult',function(){
    return {
        restrict: 'AE',
        templateUrl: 'directives/wspa_result.html',
        replace:true,
        scope:{
            forecast: '=',
            convertToTempUnit: '&',
            convertToDate: '&',
            dateFormat: '@',
        }
    }
});

