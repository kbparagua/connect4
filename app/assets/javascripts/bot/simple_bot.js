(function(){

  var DEFAULT_LOOKAHEAD = 6;

  App.SimpleBot = function(symbol){
    this._playingBoard = null;
    this._symbol = symbol;
  };

  App.SimpleBot.prototype = {

    playOn: function(board){
      this._playingBoard = board;
      this._playingBoard.on('player:drop', this._respondToPlayerMove.bind(this));
    },

    _respondToPlayerMove: function(symbol, column){
      // Do not respond to own move.
      if (this._symbol === symbol) return;

      // Do not respond when game is over.
      if ( this._playingBoard.arbiter.gameOver() ) return;

      var bestMove = this._bestMove(this._playingBoard);

      this._playingBoard.playerDropTo( bestMove.column );
    },

    _bestMove: function(board, desiredLookahead){
      if (desiredLookahead === 0) return this._finalMove(board);

      var arbiter = board.arbiter,
          lookahead = desiredLookahead || DEFAULT_LOOKAHEAD;

      arbiter.checkStatus();
      if ( arbiter.gameOver() ) return this._finalMove(board);

      lookahead--;
      var moves = this._nextMoves(board, lookahead);

      return this._myTurn(board) ?
        this._getMinScoreMove(moves) :
        this._getMaxScoreMove(moves);
    },

    _myTurn: function(board){
      return board.getState('activeSymbol') === this._symbol;
    },

    _getMaxScoreMove: function(moves){
      var choice = null;

      _.each(moves, function(move){
        if (!choice || choice.score <= move.score) choice = move;
      });

      return choice;
    },

    _getMinScoreMove: function(moves){
      var choice = null;

      _.each(moves, function(move){
        if (!choice || choice.score >= move.score) choice = move;
      });

      return choice;
    },

    _nextMoves: function(board, lookahead){
      var _this = this;

      return _.map(board.legalColumns(), function(column){
        board.pushSymbolTo(column);
        var bestMove = _this._bestMove(board, lookahead);
        board.undoState();

        return {column: column, score: bestMove.score};
      });
    },

    _finalMove: function(board){
      var score = 0;

      if ( board.arbiter.gameOver() )
        score = this._myTurn(board) ? 10 : -10;

      return {score: score, column: board.getState('lastChangedColumn')};
    }

  };

})();
