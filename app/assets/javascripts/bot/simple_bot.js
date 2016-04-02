App.SimpleBot = function(symbol){
  this._playingBoard = null;
  this._symbol = symbol;
  this._bestMove = null;
  this._defaultLookahead = 5;
};

App.SimpleBot.prototype = {

  playOn: function(board){
    this._playingBoard = board;
    this._playingBoard.on('player:drop', this._respondToPlayerMove.bind(this));
  },

  _respondToPlayerMove: function(symbol, column){
    // Do not respond to own move.
    if (this._symbol === symbol) return;

    var score = this.minimax(this._playingBoard);
    this._playingBoard.playerDropTo(this._bestMove);
  },

  minimax: function(board, desiredLookahead){
    var _this = this,
        arbiter = board.arbiter;

    var lookahead =
      desiredLookahead != null ? desiredLookahead : this._defaultLookahead;

    arbiter.checkStatus();

    if ( lookahead == 0 || arbiter.gameOver() ) return this._getScore(board);
    lookahead--;

    var scores = []
    var moves = []

    _.each(board.legalColumns(), function(column){
      board.pushSymbolTo(column);

      scores.push( _this.minimax(board, lookahead) );
      moves.push(column);

      board.undoState();
    });

    if ( board.getState('activeSymbol') !== this._symbol ){
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

    if ( board.getState('activeSymbol') === this._symbol )
      return 10;
    else
      return -10;
  }

};
