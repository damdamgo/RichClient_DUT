(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module("CurrencyApp", ['ngRoute']);
angular.module("CurrencyApp").service("CurrencyService",["$http",require("./factory")]);
angular.module("CurrencyApp").controller("CurencyController", ["$scope","$http","CurrencyService","$interval",require("./controller")]);
angular.module("CurrencyApp").directive("historiqueElem",require("./directive"));

},{"./controller":2,"./directive":3,"./factory":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
module.exports = function(http){
  this.historique = [];
  this.addHisto=function(object){
    auto = false;
    index = 0;
    for(i=0;i<this.historique.length;i++){
      if(this.historique[i].from==object.from && this.historique[i].to==object.to){
        index = i;
        auto = true;
        break;
      }
    }
    if(auto){
      this.historique[index].date= object.date;
      this.historique[index].what=object.what;
      this.historique[index].rate=object.rate;
    }
    else{
      this.historique=this.historique.concat(object);
    }
  }

  this.removeHisto=function(ob){
    index = 0;
    for(i=0;i<this.historique.length;i++){
      if(this.historique[i]==ob){
        index = i;
        break;
      }
    }
    this.historique.splice(index,1);
  }

  this.update=function(ob){
    var object = ob;
    object.update=true;
    http.jsonp('http://free.currencyconverterapi.com/api/v3/convert?compact=y&q='+object.from+'_'+object.to+'&callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
          str=object.from+'_'+object.to;
          self.result=Math.round(data[str].val*self.what*100)/100;
          dateCurrent = new Date();
          object.date= dateCurrent;
          object.rate=data[str].val;
          object.update=false;
      }).
      error(function(data, status, headers, config) {
          console.log("Erreur avec le statut Http : "+status);
      });
  }

  this.updateAll=function(){
    for(i=0;i<this.historique.length;i++){
      this.update(this.historique[i]);
    }
  }
}

},{}]},{},[1]);
