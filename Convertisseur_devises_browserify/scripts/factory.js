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
