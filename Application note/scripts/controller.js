angular.module('NoteApp').controller('NoteController',[function(){
  this.messageNote="";
  this.info=null;

  this.save=function(){
    if(this.count()<0)this.messageNote = (this.messageNote).substring(0, this.messageNote.length - 1);
    this.info="note modifiée";
  }

  this.clear=function(){
      this.messageNote='';
      this.info=null;
  }
  this.count=function(){
    return 100-(this.messageNote).length;
  }
}]);
