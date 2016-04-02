(function(){

  App.Arbiter = function(board){
    this._scores = [];
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
      var value = this._board.get(row, col),
          score = new App.Score();

      this._scores[row][col] = score;

      if (!value) return score;

      var lower = this._board.get(row - 1, col),
          left = this._board.get(row, col - 1),
          lowerLeft = this._board.get(row - 1, col - 1),
          lowerRight = this._board.get(row - 1, col + 1);

      if ( value === lower )
        score.addVertical( this._getScore(row - 1, col) );

      if ( value === left )
        score.addHorizontal( this._getScore(row, col - 1) );

      if ( value === lowerLeft )
        score.addLeftDiagonal( this._getScore(row - 1, col - 1) );

      if ( value === lowerRight )
        score.addRightDiagonal( this._getScore(row - 1, col + 1) );

      this._scores[row][col] = score;

      return score;
    },

    _getScore: function(row, col){
      if ( this._scores[row] ) return this._scores[row][col];
    }

  };

})();
