App.ColumnView = Backbone.View.extend({

  className: 'js-column column',
  events: {'click': '_triggerOnClick'},

  initialize: function(options){
    this._index = options.index;
    this._cells = options.cells;
    this._onClick = options.onClick;
  },

  render: function(){
    this.$el.html('');
    this._appendCellViews();

    return this;
  },

  _appendCellViews: function(){
    var _this = this,
        cellViews = this._getCellViews();

    _.each(cellViews, function(cellView){
      cellView.render();
      _this.$el.append( cellView.$el );
    });
  },

  _getCellViews: function(){
    return _.map(this._cells, function(cell){
      return new App.CellView({model: cell});
    });
  },

  _triggerOnClick: function(e){
    e.preventDefault();
    if (this._onClick) this._onClick(this._index);
  }

});
