module.exports=function() {
  return {
    restrict: 'A',
    templateUrl: 'templates/historique.html',
    scope : {
      onDelete:"&",
      onUpdate:"&",
      object : "="
    }
  };
};
