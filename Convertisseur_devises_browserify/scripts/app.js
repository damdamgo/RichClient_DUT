angular.module("CurrencyApp", ['ngRoute']);
angular.module("CurrencyApp").service("CurrencyService",["$http",require("./factory")]);
angular.module("CurrencyApp").controller("CurencyController", ["$scope","$http","CurrencyService","$interval",require("./controller")]);
angular.module("CurrencyApp").directive("historiqueElem",require("./directive"));
