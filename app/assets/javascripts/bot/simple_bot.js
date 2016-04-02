App.SimpleBot = function(symbol){
  this._symbol = symbol;
};

App.SimpleBot.prototype = {

  bestMove: function(board){
    var arbiter = board.arbiter;
    arbiter.checkStatus();

    if ( arbiter.gameOver() ) return this._getScore(board);

    scores = []
    moves = []

    _.each(board.legalColumns(), function(column){
      var possibleBoard = board.dropTo(column);
      board.undoDrop();
    });


  },

  _getScore: function(board){
    if ( board.arbiter.draw() ) return 0;

    if ( board.state().activeSymbol == this._symbol )
      return 10;
    else
      return -10;
  }

};
