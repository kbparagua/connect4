(function(){

  var TOTAL_ROWS = 6,
      TOTAL_COLUMNS = 7;

  var BLANK_TILE_SYMBOL = '_';


  App.Board = function(){
    this._initGrid();
    this._activeSymbol = null;
  };

  App.Board.prototype = {

    activateSymbol: function(symbol){
      this._activeSymbol = symbol;
    },

    dropTo: function(column){
      var disc = new App.Disc( this._activeSymbol );

      for (var r = 0; r < TOTAL_ROWS; r++){
        var targetCell = this._grid[r][column];

        if ( targetCell == null ){
          this._grid[r][column] = disc
          return true;
        }
      }

      return false;
    },

    get: function(row, col){
      if ( !this._grid[row] ) return null;
      return this._grid[row][col] || null;
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

    _initGrid: function(){
      this._grid = [];
      for (var row = 0; row < TOTAL_ROWS; row++) this._grid[row] = [];
    },
  };

})();
