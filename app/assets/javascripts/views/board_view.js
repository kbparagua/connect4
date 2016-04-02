App.BoardView = Backbone.View.extend({

  className: 'js-board board',

  initialize: function(options){
    this.listenTo(this.model, 'disc:new', this._newDisc);
    this._onColumnClick = options.onColumnClick;
    this._columnViews = [];
  },

  render: function(){
    this.$el.html('');
    this._appendColumnViews();

    return this;
  },

  _appendColumnViews: function(){
    for (var i = 0, n = this._getColumnViews().length; i < n; i++){
      var column = this._getColumnViews()[i];

      column.render();
      this.$el.append( column.$el );
    }
  },

  _getColumnViews: function(){
    if (this._columnViews.length) return this._columnViews;

    for (var c = 0; c < this.model.totalColumns; c++){
      var view = this._createColumnView(c);
      this._columnViews.push(view);
    }

    return this._columnViews;
  },

  _createColumnView: function(col){
    var cells = this.model.getColumn(col);

    return new App.ColumnView({
      index: col,
      cells: cells,
      onClick: this._triggerOnColumnClick.bind(this)
    });
  },

  _triggerOnColumnClick: function(column){
    if (this._onColumnClick) this._onColumnClick(column);
  },

  _newDisc: function(disc, column){
    var columnView = this._getColumnViews()[column];
    columnView.push(disc);
  }

});
