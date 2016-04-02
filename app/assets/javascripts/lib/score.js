(function(){

  App.Score = function(){
    this.horizontal = 1;
    this.vertical = 1;
    this.leftDiagonal = 1;
    this.rightDiagonal = 1;
  };

  App.Score.prototype = {

    reached: function(number){
      switch (number){
        case this.horizontal:
        case this.vertical:
        case this.leftDiagonal:
        case this.rightDiagonal:
          return true;
        default:
          return false;
      }
    },

    addHorizontal: createAdderFunction('horizontal'),
    addVertical: createAdderFunction('vertical'),
    addLeftDiagonal: createAdderFunction('leftDiagonal'),
    addRightDiagonal: createAdderFunction('rightDiagonal')

  };

  function createAdderFunction(direction){
    return function(other){
      this[direction] += other[direction];
    };
  }

})();
