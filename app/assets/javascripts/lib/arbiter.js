(function(){

  var MAX_SCORE = 4;

  var ONGOING = 0,
      HAS_WINNER = 1,
      DRAW = 2;


  App.Arbiter = function(board){
    this._scores = [];
    this._status = null;
    this._board = board;
  };


  App.Arbiter.prototype = {

    checkStatus: function(){
      if ( this._hasWinner() )
        this._status = HAS_WINNER;

      else if ( this._board.isFull() )
        this._status = DRAW;

      else
        this._status = ONGOING;
    },

    gameOver: function(){
      return this.hasWinner() || this.draw();
    },

    hasWinner: function(){
      return this._status === HAS_WINNER;
    },

    draw: function(){
      return this._status === DRAW;
    },

    ongoing: function(){
      return this._status === ONGOING;
    },





    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    _hasWinner: function(){
      if ( this._board.getState('droppedDiscs') < MAX_SCORE ) return false;

      this._scores = [];

      for (var row = 0; row < App.Board.TOTAL_ROWS; row++)
        for (var col = 0; col < App.Board.TOTAL_COLUMNS; col++)
          if ( this._discWins(row, col) ) return true;

      return false;
    },

    _discWins: function(row, col){
      var score = this._computeDiscScore(row, col);
      return score.reached(MAX_SCORE);
    },

    // NOTE: Intentionally long function body to improve speed.
    _computeDiscScore: function(row, col){
      var value = this._board.get(row, col),
          score = new App.Score();

      this._scores[row] = this._scores[row] || [];
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

      return score;
    },

    _getScore: function(row, col){
      return this._scores[row] ? this._scores[row][col] : 0;
    }

  };

})();
