angular.module("CurrencyApp").controller("CurencyController",["$scope","$http",function($scope,http){
  var self=this;
  this.currencies={};
  this.from=null;
  this.to=null;
  this.what=1;
  this.result=null;
  this.acceptHistory=true;
  this.conversions=[];

  this.getResult=function(){
    http.jsonp('http://free.currencyconverterapi.com/api/v3/convert?compact=y&q='+this.from.code+'_'+this.to.code+'&callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
          str=self.from.code+'_'+self.to.code;
          self.result=Math.round(data[str].val*self.what*100)/100;
          if(self.acceptHistory){
            dateCurrent = new Date();
            conversion={from:self.from.code,to:self.to.code,amount:function(){return this.rate*this.what},initialAmount:function(){this.initialRate*this.what},delta:function(){return (this.rate - this.initialRate)*this.what},rate:data[str].val,what:self.what,update:false,initialRate:data[str].val,date:dateCurrent};
            self.conversions=self.conversions.concat(conversion);
            console.log(self.conversions);
          }
      }).
      error(function(data, status, headers, config) {
          console.log("Erreur avec le statut Http : "+status);
      });
  }
  this.swap=function(){
    this.tmp=this.from;
    this.from=this.to;
    this.to=this.tmp;
  }


  this.onDelete=function(ob){
    index = 0;
    for(i=0;i<this.conversions.length;i++){
      if(this.conversions[i]==ob){
        index = i;
        break;
      }
    }
    this.conversions.splice(index,1);
  }

  this.onUpdate=function(ob){
    console.log("modifier");
  }

  http.get('data/currencymap.json').
    success(function(data, status, headers, config) {
        self.currencies = data;
        self.from = data.EUR;
        self.to = data.USD;
        console.log(self.to);
    }).
    error(function(data, status, headers, config) {
        console.log("Erreur avec le statut Http : "+status);
    });


}]);
