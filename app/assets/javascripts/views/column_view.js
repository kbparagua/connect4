App.ColumnView = Backbone.View.extend({

  className: 'js-column column',
  events: {'click': '_triggerOnClick'},

  initialize: function(options){
    this._index = options.index;

    this._cellViews = [];
    this._freeTopRow = App.Board.TOTAL_COLUMNS - 1;

    this._onClick = options.onClick;
  },

  render: function(){
    this.$el.html('');

    this._cellViews = this._initCellViews();
    this._appendCellViews();

    return this;
  },

  push: function(symbol){
    var cellView = this._freeTopCell();
    cellView.setType(symbol);

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
    var views = [];

    for (var c = 0, n = App.Board.TOTAL_COLUMNS; c < n; c++){
      views.push( new App.CellView() );
    }

    return views;
  },

  _triggerOnClick: function(e){
    e.preventDefault();
    if (this._onClick) this._onClick(this._index);
  }

});
