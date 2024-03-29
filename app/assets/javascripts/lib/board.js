(function(){

  App.Board = function(){
    this.arbiter = new App.Arbiter(this);

    this._history = [this._initialState()];
    this._initColumns();

    this._locked = false;
  };

  App.Board.TOTAL_ROWS = 6;
  App.Board.TOTAL_COLUMNS = 7;

  App.Board.PLAYER_1_SYMBOL = 1;
  App.Board.PLAYER_2_SYMBOL = 2;

  App.Board.TOTAL_DISCS = App.Board.TOTAL_ROWS * App.Board.TOTAL_COLUMNS;

  App.Board.prototype = {

    lock: function(){
      this._locked = true;
    },

    unlock: function(){
      this._locked = false;
    },

    isUnlocked: function(){
      return !this._locked;
    },

    nextSymbol: function(){
      return this.getState('activeSymbol') === App.Board.PLAYER_1_SYMBOL ?
        App.Board.PLAYER_2_SYMBOL :
        App.Board.PLAYER_1_SYMBOL;
    },

    setState: function(key, value){
      this._state()[key] = value;
    },

    getState: function(key){
      return this._state()[key];
    },

    undoState: function(){
      this._history.pop();
    },

    reset: function(){
      this._history = [this._initialState()];
      this.trigger('reset');
    },

    legalColumns: function(){
      var columns = [];

      for (var c = 0; c < App.Board.TOTAL_COLUMNS; c++)
        if ( this.canDropTo(c) ) columns.push(c);

      return columns;
    },

    isFull: function(){
      return this.getState('droppedDiscs') === App.Board.TOTAL_DISCS;
    },

    canDropTo: function(col){
      return this.arbiter.ongoing() &&
        this.getState('columns')[col].length < App.Board.TOTAL_ROWS;;
    },

    playerDropTo: function(column){
      this.pushSymbolTo(column);
      this.arbiter.checkStatus();

      this.trigger('player:drop', this.getState('activeSymbol'), column);
    },

    pushSymbolTo: function(col){
      this._pushNewState();
      this._toggleSymbol();

      var column = this.getState('columns')[col],
          droppedDiscs = this.getState('droppedDiscs');

      column.push( this.getState('activeSymbol') );

      this.setState('droppedDiscs', ++droppedDiscs);
      this.setState('lastChangedColumn', col);
    },

    get: function(row, col){
      if ( !this.getState('columns')[col] ) return null;
      return this.getState('columns')[col][row] || null;
    },





    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    _state: function(){
      return this._history[ this._history.length - 1 ];
    },

    _initialState: function(){
      return {
        columns: [],
        activeSymbol: null,
        droppedDiscs: 0,
        lastChangedColumn: null
      };
    },

    _pushNewState: function(){
      var newState = {
        droppedDiscs: this.getState('droppedDiscs'),
        activeSymbol: this.getState('activeSymbol'),
        lastChangedColumn: this.getState('lastChangedColumn'),
        columns: []
      };

      _.each(this.getState('columns'), function(column){
        newState.columns.push( _.clone(column) )
      });

      this._history.push(newState);
    },

    _toggleSymbol: function(){
      this.setState('activeSymbol', this.nextSymbol());
    },

    _initColumns: function(){
      for (var col = 0; col < App.Board.TOTAL_COLUMNS; col++)
        this.getState('columns')[col] = [];
    }

  };

  _.extend(App.Board.prototype, Backbone.Events);

})();
