App.ColumnView = Backbone.View.extend({

  className: 'js-column column',
  events: {'click': 'dropDisc'},

  initialize: function(options){
    this._cells = options.cells;
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

  dropDisc: function(e){
    e.preventDefault();
    console.log('Drop!');
  }

});
