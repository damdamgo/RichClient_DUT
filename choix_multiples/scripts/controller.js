angular.module("ListesApp").controller("ListesController",["$scope","$http",function($scope,http){
  var self=this;
  this.dispoItems=[];

  this.includedItems=[];

  this.selectedDispoItems=[];

  this.selectedIncludedItems=[];

  this.step=1;

  this.selectedDispo=[];

  this.selectedInclu=[];

  this.addToIncluded=function(){
      while(this.selectedDispo.length!=0){
        this.removedispoItems(this.selectedDispo[0].title)
        this.selectedDispo.splice(0,1);
      }
  }

  this.addAllToIncluded=function(){
    this.includedItems=this.includedItems.concat(this.dispoItems);
    this.dispoItems=[];
  }

  this.removeFromIncluded=function(){
    while(this.selectedInclu.length!=0){
      this.removeincludedItems(this.selectedInclu[0].title);
      this.selectedInclu.splice(0,1);
    }
  }

  this.RemoveAllFromIncluded=function(){
    this.dispoItems=this.dispoItems.concat(this.includedItems);
    this.includedItems=[];
  }

  this.includedb=function(){
    this.removeincludedItems(this.selectedInclu[0].title);

  }

  this.dispodb=function(){
    this.removedispoItems(this.selectedDispo[0].title)
  }

  this.removedispoItems=function(title){
    for(i=0;i<this.dispoItems.length;i++){
      if(this.dispoItems[i].title==title){
        this.includedItems.push(this.dispoItems[i]);
        this.dispoItems.splice(i, 1);
        break;
      }
    }
  }



  this.removeincludedItems=function(title){
    for(i=0;i<this.includedItems.length;i++){
      if(this.includedItems[i].title==title){
        this.dispoItems.push(this.includedItems[i]);
        this.includedItems.splice(i, 1);
        break;
      }
    }
  }

  http({
  method: 'GET',
  url: 'data/produit.json'
}).then(function successCallback(response){
      self.dispoItems=response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });


}]);
