(function(){

  App.Board = function(){
    this.arbiter = new App.Arbiter(this);

    var initialState = {
      columns: [],
      pieceCount: 0,
      activeSymbol: null,
      lastChangedColumn: null
    };

    this._history = [initialState];
    this._initColumns();
  };

  App.Board.TOTAL_ROWS = 6;
  App.Board.TOTAL_COLUMNS = 7;

  App.Board.PLAYER_1_SYMBOL = 1;
  App.Board.PLAYER_2_SYMBOL = 2;

  var TOTAL_PIECES = App.Board.TOTAL_ROWS * App.Board.TOTAL_COLUMNS;

  App.Board.prototype = {

    state: function(){
      return this._history[ this._history.length - 1 ];
    },

    reset: function(){
      for (var i = this._history.length - 1; i > 0; i--)
        this._history.pop();

      this.trigger('reset');
    },

    legalColumns: function(){
      var columns = [];

      for (var c = 0; c < App.Board.TOTAL_COLUMNS; c++)
        if ( this.canDropTo(c) ) columns.push(c);

      return columns;
    },

    isFull: function(){
      return this.state().pieceCount == TOTAL_PIECES;
    },

    canDropTo: function(column){
      return this.state().columns[column].length < App.Board.TOTAL_ROWS;;
    },

    dropToWithEvent: function(column){
      this.dropTo(column);
      this.trigger('symbol:new', this.state().activeSymbol, column);
    },

    dropTo: function(column){
      this._pushNewState();

      this._toggleSymbol();
      this.state().columns[column].push( this.state().activeSymbol );

      this.state().pieceCount++;
      this.state().lastChangedColumn = column;
    },

    undoDrop: function(){
      this._history.pop();
    },

    get: function(row, col){
      if ( !this.state().columns[col] ) return null;
      return this.state().columns[col][row] || null;
    },

    getColumn: function(col){
      return this.state().columns[col];
    },

    toString: function(){
      output = '';

      for (var row = App.Board.TOTAL_ROWS - 1; row >= 0; row--){
        var rowTiles = [];

        for (var col = 0; col < App.Board.TOTAL_COLUMNS; col++){
          var value = this.state().columns[col][row] || '_';
          rowTiles.push(value);
        }

        rowTiles.push("\n")
        output += rowTiles.join(' ');
      }

      return output;
    },

    _pushNewState: function(){
      var newState = {
        pieceCount: this.state().pieceCount,
        activeSymbol: this.state().activeSymbol,
        lastChangedColumn: this.state().lastChangedColumn
      };

      newState.columns = [];
      _.each(this.state().columns, function(column){
        newState.columns.push( _.clone(column) )
      });

      this._history.push(newState);
    },

    _toggleSymbol: function(){
      this.state().activeSymbol =
        this.state().activeSymbol === App.Board.PLAYER_1_SYMBOL ?
          App.Board.PLAYER_2_SYMBOL :
          App.Board.PLAYER_1_SYMBOL;
    },

    _initColumns: function(){
      this.state().columns = [];

      for (var col = 0; col < App.Board.TOTAL_COLUMNS; col++)
        this.state().columns[col] = [];
    }

  };

  _.extend(App.Board.prototype, Backbone.Events);

})();
