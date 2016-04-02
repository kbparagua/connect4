App.SimpleBot = function(symbol){
  this._symbol = symbol;
  this._bestMove = null;
  this._defaultDepth = 5;
};

App.SimpleBot.prototype = {

  minimax: function(board, lookahead){
    var _this = this,
        arbiter = board.arbiter;

    var depth = lookahead != null ? lookahead : this._defaultDepth;

    arbiter.checkStatus();

    if ( depth == 0 || arbiter.gameOver() ) return this._getScore(board);

    var scores = []
    var moves = []

    depth--;

    _.each(board.legalColumns(), function(column){
      board.dropTo(column);

      scores.push( _this.minimax(board, depth) );
      moves.push(column);

      board.undoDrop();
    });

    if ( board.state().activeSymbol != this._symbol ){
      var highScore = _.max(scores);
      this._bestMove = moves[ scores.indexOf(highScore) ];

      return highScore;
    }
    else {
      var lowScore = _.min(scores);
      this._bestMove = moves[ scores.indexOf(lowScore) ];

      return lowScore;
    }
  },

  _getScore: function(board){
    if ( board.arbiter.ongoing() || board.arbiter.draw() ) return 0;

    if ( board.state().activeSymbol == this._symbol )
      return 10;
    else
      return -10;
  }

};
