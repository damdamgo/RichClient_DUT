angular.module("ServicesApp").controller("ServicesController",[function(){
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
this.totalPrice=0;
this.total=0;

  this.total=function(){

  }
  this.toggleActive=function(index){
      if(this.services[index].active==true)this.services[index].active=false;
      else this.services[index].active=true;
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
}]);
