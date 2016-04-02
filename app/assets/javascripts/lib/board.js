(function(){

  App.Board = function(){
    this._initColumns();
    this._activeSymbol = null;
  };

  App.Board.TOTAL_ROWS = 7;
  App.Board.TOTAL_COLUMNS = 6;

  App.Board.PLAYER_1_SYMBOL = 1;
  App.Board.PLAYER_2_SYMBOL = 2;


  App.Board.prototype = {

    reset: function(){
      this._initColumns();
    },

    isFull: function(){
      for (var c = 0; c < App.Board.TOTAL_COLUMNS; c++)
        for (var r = 0; r < App.Board.TOTAL_ROWS; r++)
          if ( !this._columns[c][r] ) return false;

      return true;
    },

    canDropTo: function(column){
      return this._columns[column].length < App.Board.TOTAL_COLUMNS;
    },

    dropTo: function(column){
      this._toggleSymbol();
      this._columns[column].push( this._activeSymbol );

      this.trigger('symbol:new', this._activeSymbol, column);

      return true;
    },

    get: function(row, col){
      if ( !this._columns[col] ) return null;
      return this._columns[col][row] || null;
    },

    getColumn: function(col){
      return this._columns[col];
    },

    toString: function(){
      output = '';

      for (var row = App.Board.TOTAL_ROWS - 1; row >= 0; row--){
        var rowTiles = [];

        for (var col = 0; col < App.Board.TOTAL_COLUMNS; col++){
          var value = this._columns[col][row] || '_';
          rowTiles.push(value);
        }

        rowTiles.push("\n")
        output += rowTiles.join(' ');
      }

      return output;
    },

    _toggleSymbol: function(){
      this._activeSymbol =
        this._activeSymbol === App.Board.PLAYER_1_SYMBOL ?
          App.Board.PLAYER_2_SYMBOL :
          App.Board.PLAYER_1_SYMBOL;
    },

    _initColumns: function(){
      this._columns = [];

      for (var col = 0; col < App.Board.TOTAL_COLUMNS; col++)
        this._columns[col] = [];
    }

  };

  _.extend(App.Board.prototype, Backbone.Events);

})();
