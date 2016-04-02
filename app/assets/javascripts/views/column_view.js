App.ColumnView = Backbone.View.extend({

  className: 'js-column column',
  events: {'click': '_triggerOnClick'},

  initialize: function(options){
    this._index = options.index;
    this._cells = options.cells;
    this._cellViews = [];

    this._onClick = options.onClick;
  },

  render: function(){
    this.$el.html('');
    this._appendCellViews();

    return this;
  },

  addDisc: function(row){
    var cellView = this._getCellViews()[row];
    cellView.mark();
  },

  _appendCellViews: function(){
    var _this = this;

    _.each(this._getCellViews(), function(cellView){
      cellView.render();
      _this.$el.append( cellView.$el );
    });
  },

  _getCellViews: function(){
    if (this._cellViews.length) return this._cellViews;

    this._cellViews =
      _.map(this._cells, function(cell){
        return new App.CellView({model: cell});
      });

    return this._cellViews;
  },

  _triggerOnClick: function(e){
    e.preventDefault();
    if (this._onClick) this._onClick(this._index);
  }

});
