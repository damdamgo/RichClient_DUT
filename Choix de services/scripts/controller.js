angular.module("ServicesApp").controller("ServicesController",["$http","$scope",function(http,$scope){
  var self = this;
  this.services=[
    {
        name: 'Web Development',
        price: 300,
        active:true
    },{
        name: 'Design',
        price: 400,
        active:false
    },{
        name: 'Integration',
        price: 250,
        active:false
    },{
        name: 'Formation',
        price: 220,
        active:false
    }
];
this.totalPrice=1;
this.total=1;
this.promos={};
this.textPromos="";
this.acceptPromo=false;
this.remiseSurTotal=0;
this.prixAvecRemise=1;


  this.toggleActive=function(index){
      if(this.services[index].active==true)this.services[index].active=false;
      else this.services[index].active=true;
      this.countActive();
  }

  this.calculTotalAvecRemise=function(){
    this.remiseSurTotal=this.promos[this.textPromos]*this.totalPrice;
    this.prixAvecRemise=this.remiseSurTotal+this.totalPrice;
  }

  this.countActive=function(){
    this.total=0;
    this.totalPrice=0;
    for(i=0;i<this.services.length;i++){
        if(this.services[i].active==true){
          this.total++;
          this.totalPrice+=this.services[i].price;
        }
    }
    this.calculTotalAvecRemise();
  }
  this.countActive();



  this.checkPromos=function(){
    console.log(this.promos);
    if(this.textPromos in  this.promos && this.acceptPromo){
        this.calculTotalAvecRemise();
    }
    else{
      this.remiseSurTotal=0;
      this.prixAvecRemise=this.totalPrice;
    }
  }

  http({
  method: 'GET',
  url: 'data/promo.json'
  }).then(function successCallback(response) {
      self.promos=response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });
}]);
