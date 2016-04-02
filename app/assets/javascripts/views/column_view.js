App.ColumnView = Backbone.View.extend({

  className: 'js-column column',
  events: {'click': '_triggerOnClick'},

  initialize: function(options){
    this._index = options.index;

    this._cells = options.cells;
    this._cellViews = [];
    this._freeTopRow = this._cells.length - 1;

    this._onClick = options.onClick;
  },

  render: function(){
    this.$el.html('');

    this._cellViews = this._initCellViews();
    this._appendCellViews();

    return this;
  },

  push: function(disc){
    var cellView = this._freeTopCell();
    cellView.setModel(disc);

    this._freeTopRow--;
  },

  _freeTopCell: function(){
    return this._cellViews[ this._freeTopRow ];
  },

  _appendCellViews: function(){
    var _this = this;

    _.each(this._cellViews, function(view){
      _this.$el.append( view.render().$el );
    });
  },

  _initCellViews: function(){
    return _.map(this._cells, function(cell){
      return new App.CellView({model: cell});
    });
  },

  _triggerOnClick: function(e){
    e.preventDefault();
    if (this._onClick) this._onClick(this._index);
  }

});
