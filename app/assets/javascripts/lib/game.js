(function(){

  var PLAYER_1_SYMBOL = 1,
      PLAYER_2_SYMBOL = 2;

  App.Game = function(){
    this.board = new App.Board();
    this._activeSymbol = null;
    this._toggleSymbol();

    console.log( this.board.toString() );
  };

  App.Game.prototype = {

    reset: function(){
      this.board.reset();
      this._toggleSymbol();

      this.trigger('reset');
    },

    dropTo: function(column){
      var success = this.board.dropTo(column);
      if (success) this._toggleSymbol();
    },

    getStatus: function(){
      if ( this._hasWinner() )
        return App.GameStatus.GAME_OVER;

      else if ( this.board.isFull() )
        return App.GameStatus.DRAW;

      else
        return App.GameStatus.ONGOING;
    },

    _hasWinner: function(){
      var arbiter = new App.Arbiter(this.board);
      return arbiter.hasWinner();
    },

    _toggleSymbol: function(){
      this._activeSymbol =
        this._activeSymbol === PLAYER_1_SYMBOL ?
          PLAYER_2_SYMBOL :
          PLAYER_1_SYMBOL;

      this.board.activateSymbol(this._activeSymbol);
    }

  };


  _.extend(App.Game.prototype, Backbone.Events);

})();
