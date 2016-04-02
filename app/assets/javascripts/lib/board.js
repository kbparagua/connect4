(function(){

  var TOTAL_ROWS = 6,
      TOTAL_COLUMNS = 7;

  var BLANK_TILE_SYMBOL = '_';


  App.Board = function(){
    this.totalRows = TOTAL_ROWS;
    this.totalColumns = TOTAL_COLUMNS;

    this._initGrid();
    this._activeSymbol = null;
  };

  App.Board.prototype = {

    reset: function(){
      this._initGrid();
    },

    activateSymbol: function(symbol){
      this._activeSymbol = symbol;
    },

    isFull: function(){
      for (var r = 0; r < TOTAL_ROWS; r++)
        for (var c = 0; c < TOTAL_COLUMNS; c++)
          if ( !this._grid[r][c] ) return false;

      return true;
    },

    dropTo: function(column){
      if (column >= TOTAL_COLUMNS) return false;

      for (var r = 0; r < TOTAL_ROWS; r++){
        var targetCell = this._grid[r][column];

        if ( targetCell == null ){
          this._placeDisc(r, column);
          return true;
        }
      }

      return false;
    },

    get: function(row, col){
      if ( !this._grid[row] ) return null;
      return this._grid[row][col] || null;
    },

    getColumn: function(col){
      var cells = [];

      for (var row = 0; row < TOTAL_ROWS; row++)
        cells.push( this.get(row, col) );

      return cells;
    },

    toString: function(){
      output = '';

      for (var row = TOTAL_ROWS - 1; row >= 0; row--){
        var rowTiles = [];

        for (var col = 0; col < TOTAL_COLUMNS; col++){
          var tile = this._grid[row][col],
              value = tile ? tile.value : BLANK_TILE_SYMBOL;

          rowTiles.push(value);
        }

        rowTiles.push("\n")
        output += rowTiles.join(' ');
      }

      return output;
    },

    _placeDisc: function(row, col){
      var disc = new App.Disc(this._activeSymbol);
      this._grid[row][col] = disc;

      this.trigger('disc:new', disc, col);
    },

    _initGrid: function(){
      this._grid = [];
      for (var row = 0; row < TOTAL_ROWS; row++) this._grid[row] = [];
    },
  };

  _.extend(App.Board.prototype, Backbone.Events);

})();
