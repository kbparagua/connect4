App.BoardView = Backbone.View.extend({

  className: 'js-board board',

  initialize: function(options){
    this.listenTo(this.model, 'symbol:new', this._newDisc);
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
    if ( !this.model.canDropTo(column) ) return;

    this.model.dropTo(column);
    this._reactToStatus();
  },

  _newDisc: function(symbol, column){
    var columnView = this._columnViews[column];
    columnView.push(symbol);
  },

  _reactToStatus: function(){
    var arbiter = this.model.arbiter;
    arbiter.checkStatus();

    if ( arbiter.hasWinner() ) this._gameOver();
    else if ( arbiter.draw() ) this._draw();
    else this._ongoing();
  },

  _ongoing: function(){},

  _gameOver: function(){
    alert('Player ' + this.model._activeSymbol + ' wins!');
  },

  _draw: function(){
    alert("It's a draw!");
  }

});
