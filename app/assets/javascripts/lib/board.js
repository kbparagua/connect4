(function(){

  var TOTAL_ROWS = 6,
      TOTAL_COLUMNS = 7;


  App.Board = function(){
    this.board = [];
    this._initBoard();
  };

  App.Board.prototype = {

    get: function(row, col){
      if ( !this.board[row] ) return null;
      return this.board[row][col] || null;
    },

    toString: function(){
      output = '';

      for (var row = TOTAL_ROWS - 1; row >= 0; row--){
        var rowTiles = [];

        for (var col = 0; col < 0; col++){
          var tile = this.board[row][col];
          rowTiles.push(tile.value);
        }

        rowTiles.push("\n")
        output += rowTiles.join(' ');
      }

      return output;
    },

    _initBoard: function(){
      for (var row = 0; row < TOTAL_ROWS; row++) this._initTilesFor(row);
    },

    _initTilesFor: function(row){
      this.board[row] = [];

      for (var col = 0; col < TOTAL_COLUMNS; col++)
        this.board[row][col] = new App.Tile();
    }

  };

})();
