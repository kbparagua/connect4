App.BoardView = Backbone.View.extend({

  className: 'js-board board',

  initialize: function(options){
    this.listenTo(this.model, 'disc:new', this._newDisc);
    this._onColumnClick = options.onColumnClick;
    this._columnViews = [];
  },

  render: function(){
    this.$el.html('');

    this._columnViews = this._getColumnViews();
    this._appendColumnViews();

    return this;
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

    for (var c = 0; c < this.model.totalColumns; c++)
      views.push( this._createColumnView(c) );

    return views;
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
    var columnView = this._columnViews[column];
    columnView.push(disc);
  }

});
