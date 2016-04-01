(function(){

  var WINNING_SCORE = 4;


  App.Disc = function(value){
    this.value = value;
    this._initScore();
  };

  App.Disc.prototype = {

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
      this.score = {
        horizontal: 1,
        vertical: 1,
        rightDiagonal: 1,
        leftDiagonal: 1
      };
    }

  };


  function createScoreAdder(direction){
    var adder = function(otherDisc){
      this.score[direction] += otherDisc.score[direction];
    };

    return adder;
  }

})();
