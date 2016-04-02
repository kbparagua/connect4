(function(){

  App.Score = function(){
    this.horizontal = 1;
    this.vertical = 1;
    this.leftDiagonal = 1;
    this.rightDiagonal = 1;
  };

  App.Score.prototype = {

    addHorizontal: createAdderFunction('horizontal'),
    addVertical: createAdderFunction('vertical'),
    addLeftDiagonal: createAdderFunction('leftDiagonal'),
    addRightDiagonal: createAdderFunction('rightDiagonal')

  };

  function createAdderFunction(direction){
    return function(other){
      if (!other) return;
      this[direction] += other[direction];
    };
  }

})();
