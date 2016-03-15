angular.module("CurrencyApp").directive('historiqueElem', function() {
  return {
    restrict: 'A',
    templateUrl: 'templates/historique.html',
    scope : {
      onDelete:"&",
      onUpdate:"&",
      object : "="
    }
  };
});
