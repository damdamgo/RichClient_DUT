angular.module("ServicesApp").controller("ServicesController",["$http","$scope",function(http,$scope){
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
$scope.replace={promos:{}};

  this.toggleActive=function(index){
      if(this.services[index].active==true)this.services[index].active=false;
      else this.services[index].active=true;
      this.countActive();
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
  }
  this.countActive();

  http({
  method: 'GET',
  url: 'data/promo.json'
  }).then(function successCallback(response) {
      console.log($scope.replace);
      $scope.replace.promos=response.data;
      console.log($scope.replace);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });
}]);
