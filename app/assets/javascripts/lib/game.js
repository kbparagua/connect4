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

      var arbiter = new App.Arbiter(this.board);
      console.log('has winner? ' + arbiter.hasWinner());
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
