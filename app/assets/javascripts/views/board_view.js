App.BoardView = Backbone.View.extend({

  className: 'js-board board board-player-' + App.Board.PLAYER_1_SYMBOL,

  initialize: function(options){
    this.listenTo(this.model, 'player:drop', this._dropDisc);
    this.listenTo(this.model, 'reset', this.render);

    this._columnViews = [];
  },

  render: function(){
    this._removeColumnViews();

    this.$el.html('');

    this._columnViews = this._getColumnViews();
    this._appendColumnViews();

    return this;
  },

  _removeColumnViews: function(){
    _.each(this._columnViews, function(view){ view.remove(); });
  },

  _appendColumnViews: function(){
    for (var i = 0, n = this._getColumnViews().length; i < n; i++){
      var view = this._columnViews[i];

      view.render();
      this.$el.append( view.$el );
    }
  },

  _getColumnViews: function(){
    var views = [];

    for (var c = 0; c < App.Board.TOTAL_COLUMNS; c++)
      views.push( this._createColumnView(c) );

    return views;
  },

  _createColumnView: function(col){
    return new App.ColumnView({
      index: col,
      onClick: this._columnClicked.bind(this)
    });
  },

  _columnClicked: function(column){
    if ( this.model.isUnlocked() && this.model.canDropTo(column) )
      this.model.playerDropTo(column);
  },

  _dropDisc: function(symbol, column){
    var columnView = this._columnViews[column];
    columnView.push(symbol);

    this._toggleClass();
    this._reactToGameOver();
  },

  _reactToGameOver: function(){
    var arbiter = this.model.arbiter;

    if ( arbiter.hasWinner() ) this._gameOver();
    else if ( arbiter.draw() ) this._draw();
  },

  _ongoing: function(){},

  _gameOver: function(){
    alert('Player ' + this.model.getState('activeSymbol') + ' wins!');
    // this.model.reset();
  },

  _draw: function(){
    alert("It's a draw!");
    // this.model.reset();
  },

  _toggleClass: function(){
    var lastSymbol = this.model.getState('activeSymbol'),
        activeSymbol = this.model.nextSymbol();

    this.$el.removeClass('board-player-' + lastSymbol);
    this.$el.addClass('board-player-' + activeSymbol);
  }

});
