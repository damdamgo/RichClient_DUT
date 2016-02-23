angular.module("ContactApp").directive('contactElem', function() {
  return {
    restrict: 'A',
    templateUrl: 'template/contactElem.html',
    link: function(scope, element, attrs) {
      scope.toUpdateDirective=function(contact){
      console.log(contact);
      scope.toUpdate(contact);
      };
      scope.remove=function(contact){
        scope.delete(contact);
      }
    }
  };
});

angular.module("ContactApp").directive('frmContact', function() {
  return {
    restrict: 'E',
    controller : 'ContactController',
    controllerAs: 'ctrl',
    templateUrl: 'template/frmContact.html'
  };
});
