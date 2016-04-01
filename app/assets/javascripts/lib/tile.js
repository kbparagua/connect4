(function(){

  var WINNING_SCORE = 4;

  var DIRECTIONS = ['horizontal', 'vertical', 'rightDiagonal', 'leftDiagonal'];

  App.Tile = function(value){
    this.value = value;
    this._initScore();
  };

  App.Tile.prototype = {

    addHorizontalScore: createScoreAdder('horizontal'),
    addVerticalScore: createScoreAdder('vertical'),
    addRightDiagonalScore: createScoreAdder('rightDiagonal'),
    addLeftDiagonalScore: createScoreAdder('leftDiagonal'),

    wins: function(){
      for (var direction in this.score)
        if (this.score[direction] === WINNING_SCORE) return true;

      return false;
    },

    _initScore: function(){
      this.score = {};

      for (var i = 0, n = DIRECTIONS.length; i < n; i++){
        var direction = DIRECTIONS[i];
        this.score[direction] = 1;
      }
    }

  };


  function createScoreAdder(direction){
    var adder = function(otherTile){
      this.score[direction] += otherTile.score[direction];
    };

    return adder;
  }

})();
