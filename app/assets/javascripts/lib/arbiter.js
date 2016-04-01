(function(){

  App.Arbiter = function(board){
    this._board = board;
  };

  App.Arbiter.prototype = {
    
    hasWinner: function(){
      for (var row = 0; row < this._board.totalRows; row++)
        for (var col = 0; col < this._board.totalColumns; col++)
          if ( this._discWins(row, col) ) return true;

      return false;
    },

    _discWins: function(row, col){
      var score = this._computeDiscScore(row, col);
      return score.isMaximum();
    },

    _computeDiscScore: function(row, col){
      var disc = this._board.get(row, col),
          score = new App.Score();

      if (!disc) return score;

      var lower = this._board.get(row - 1, col),
          left = this._board.get(row, col - 1),
          lowerLeft = this._board.get(row - 1, col - 1),
          lowerRight = this._board.get(row - 1, col + 1);

      if ( disc.equalTo(lower) ) score.addVertical(lower.score);
      if ( disc.equalTo(left) ) score.addHorizontal(left.score);
      if ( disc.equalTo(lowerLeft) ) score.addLeftDiagonal(lowerLeft.score);
      if ( disc.equalTo(lowerRight) ) score.addRightDiagonal(lowerRight.score);

      disc.score = score;

      return score;
    }

  };

})();
