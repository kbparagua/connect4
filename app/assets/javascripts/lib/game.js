(function(){

  var PLAYER_1_SYMBOL = 'A',
      PLAYER_2_SYMBOL = 'B';

  App.Game = function(){
    this.board = new App.Board();
    this._activeSymbol = null;
    this._toggleSymbol();

    this._dropTo(0);
    this._dropTo(1);

    this._dropTo(1);
    this._dropTo(2);

    this._dropTo(2);
    this._dropTo(3);

    this._dropTo(4);
    this._dropTo(3);

    this._dropTo(2);
    this._dropTo(3);

    this._dropTo(3);

    console.log( this.board.toString() );
  };

  App.Game.prototype = {

    _dropTo: function(column){
      this.board.dropTo(column);
      this._toggleSymbol();
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
