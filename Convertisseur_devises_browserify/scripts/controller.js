module.exports=function($scope,http,service,intervalle){
  var self=this;
  this.currencies={};
  this.from=null;
  this.to=null;
  this.what=1;
  this.result=null;
  this.acceptHistory=true;
  this.historique = [];
  this.updateNbSecond=1000;
  this.automationUpdate=false;
  this.interval = null;

  this.getResult=function(){
    http.jsonp('http://free.currencyconverterapi.com/api/v3/convert?compact=y&q='+this.from.code+'_'+this.to.code+'&callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
          str=self.from.code+'_'+self.to.code;
          self.result=Math.round(data[str].val*self.what*100)/100;
          if(self.acceptHistory){
            dateCurrent = new Date();
            conversion={from:self.from.code,to:self.to.code,amount:function(){return this.rate*this.what},initialAmount:function(){this.initialRate*this.what},delta:function(){return (this.rate - this.initialRate)*this.what},rate:data[str].val,what:self.what,update:false,initialRate:data[str].val,date:dateCurrent};
            service.addHisto(conversion);
            self.historique = service.historique;
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
    service.removeHisto(ob);
  }

  this.onUpdate=function(ob){
    service.update(ob);
  }

  this.updateAll=function(){
      service.updateAll();
  }

  this.automation=function(){
    if(this.automationUpdate){
      this.interval=intervalle(function(){ self.updateAll(); }, this.updateNbSecond);
    }
    else{
      if(angular.isDefined(this.interval)){
        intervalle.cancel(this.interval);
        this.interval = undefined;
      }
    }
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


};
