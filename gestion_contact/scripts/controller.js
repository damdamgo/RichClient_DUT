angular.module("ContactApp").controller("ContactController",["$scope","$http",function($scope,http){
  var self=this;

  this.contacts=[{"nom":"villiers","prenom":"damien","mail":"dada@hotmail.fr","deleted":false}];

  this.contact=null;

  this.tmpContact={};

  this.operation=null;

  this.edit=0;


  $scope.toUpdate=function(contacte){
    self.tmpContact={};
    self.operation="Modifier un contact";
    self.edit=2;
    self.contact=contacte;
    self.tmpContact.nom=self.contact.nom;
    self.tmpContact.prenom=self.contact.prenom;
    self.tmpContact.mail=self.contact.mail;
  }

  this.toAdd=function(){
    self.tmpContact=null;
    this.operation="Ajouter un contact";
    this.edit=1;
  }

  this.add=function(){
    this.tmpContact.deleted=false;
    this.contacts.push(this.tmpContact);
    this.edit=0;
    this.tmpContact={};
  }

  this.update=function(){
    this.edit=0;
    this.contact.nom=this.tmpContact.nom;
    this.contact.prenom=this.tmpContact.prenom;
    this.contact.mail=this.tmpContact.mail;
    this.tmpContact={};
  }

  this.cancelOneDeletion=function(){
    self.edit=0;
    for(i=0;i<self.contacts.length;i++){
        self.contacts[i].deleted=false;
    }
  }

  this.getNbDeleted=function(){
    nb=0;
    for(i=0;i<self.contacts.length;i++){
        if(self.contacts[i].deleted==true){
          nb++;
        }
    }
    return nb;
  }

  $scope.delete=function(contact){
    self.edit=0;
    for(i=0;i<self.contacts.length;i++){
      if(self.contacts[i]==contact){
        /*  self.contacts.splice(i,1);*/
        self.contacts[i].deleted=true;
      }
    }
  }

}]);

angular.module("ContactApp").filter('checkDelete',function(){
  return function(contacts){
        var filtered = [];
        for (var i = 0; i < contacts.length; i++) {
          var contact = contacts[i];
          if (contact.deleted==false) {
            filtered.push(contact);
          }
        }
        return filtered;
  }
});
