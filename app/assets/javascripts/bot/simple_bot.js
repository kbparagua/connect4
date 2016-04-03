(function(){

  var MAX_SIMULATED_TURNS = 5;

  App.SimpleBot = function(symbol){
    this._playingBoard = null;
    this._symbol = symbol;
  };

  App.SimpleBot.prototype = {

    playOn: function(board){
      this._playingBoard = board;
      this._playingBoard.on('player:drop', this._respondToMove.bind(this));
    },

    _respondToMove: function(symbol){
      // Do not respond to own move.
      if ( symbol === this._symbol ) return;

      this._playingBoard.lock();
      setTimeout(this._respondToPlayerMove.bind(this), 1000);
    },

    _respondToPlayerMove: function(){
      if ( this._playingBoard.arbiter.ongoing() ){
        var bestMove = this._bestMove(this._playingBoard, 0);
        this._playingBoard.playerDropTo( bestMove.column );
      }

      this._playingBoard.unlock();
    },

    _bestMove: function(board, turn){
      turn++;

      var arbiter = board.arbiter;
      arbiter.checkStatus();

      if ( turn > MAX_SIMULATED_TURNS || arbiter.gameOver() )
        return this._finalMove(board, turn);

      var moves = this._nextMoves(board, turn);

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
        if (!choice || choice.score < move.score) choice = move;
      });

      return choice;
    },

    _getMinScoreMove: function(moves){
      var choice = null;

      _.each(moves, function(move){
        if (!choice || choice.score > move.score) choice = move;
      });

      return choice;
    },

    _nextMoves: function(board, turn){
      var _this = this;

      return _.map(board.legalColumns(), function(column){
        board.pushSymbolTo(column);
        var bestMove = _this._bestMove(board, turn);
        board.undoState();

        return {column: column, score: bestMove.score};
      });
    },

    _finalMove: function(board, turn){
      var score = 0;

      if ( board.arbiter.hasWinner() )
        score = this._myTurn(board) ? 10 : -10;

      return {column: board.getState('lastChangedColumn'), score: score};
    }

  };

})();
