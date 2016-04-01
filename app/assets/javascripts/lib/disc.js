(function(){

  App.Disc = function(value){
    this.value = value;
  };

  App.Disc.prototype = {

    equalTo: function(other){
      if (!other) return false;
      return this.value == other.value;

    }
  };

})();
