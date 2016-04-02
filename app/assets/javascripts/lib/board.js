(function(){

  App.Board = function(){
    this.arbiter = new App.Arbiter(this);

    this._state = {
      columns: [],
      pieceCount: 0,
      activeSymbol: null
    };

    this._initColumns();
    this._pieceCount = 0;
    this._activeSymbol = null;
  };

  App.Board.TOTAL_ROWS = 6;
  App.Board.TOTAL_COLUMNS = 7;

  App.Board.PLAYER_1_SYMBOL = 1;
  App.Board.PLAYER_2_SYMBOL = 2;

  var TOTAL_PIECES = App.Board.TOTAL_ROWS * App.Board.TOTAL_COLUMNS;

  App.Board.prototype = {

    reset: function(){
      this._initColumns();
    },

    isFull: function(){
      console.log(this._pieceCount + ' == ' + TOTAL_PIECES);
      return this._pieceCount == TOTAL_PIECES;
    },

    canDropTo: function(column){
      return this._columns[column].length < App.Board.TOTAL_COLUMNS;
    },

    dropTo: function(column){
      this._toggleSymbol();
      this._columns[column].push( this._activeSymbol );

      this._pieceCount++;

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
