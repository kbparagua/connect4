(function(){

  var PLAYER_1_SYMBOL = 'A',
      PLAYER_2_SYMBOL = 'B';

  App.Game = function(){
    this.board = new App.Board();
    this._activeSymbol = null;
    this._toggleSymbol();

    console.log( this.board.toString() );
  };

  App.Game.prototype = {

    dropTo: function(column){
      this.board.dropTo(column);
      this._toggleSymbol();

      console.log( this.board.toString() );
      console.log( this._getStatus() );
    },

    _getStatus: function(){
      var status = null;

      var arbiter = new App.Arbiter(this.board);
      if ( arbiter.hasWinner(this.board) )
        status = 'game over';

      else if ( this.board.isFull() )
        status = 'draw';

      else
        status = 'ongoing'

      return status;
    },

    _toggleSymbol: function(){
      this._activeSymbol =
        this._activeSymbol === PLAYER_1_SYMBOL ?
          PLAYER_2_SYMBOL :
          PLAYER_1_SYMBOL;

      this.board.activateSymbol(this._activeSymbol);
    }

  };

})();


window.game = new App.Game();
