(function(){

  App.BoardView = Backbone.View.extend({

    className: 'js-board board',

    render: function(){
      this.$el.html('');
      this._appendColumnViews();

      return this;
    },

    _appendColumnViews: function(){
      var columns = this._getColumnViews();

      for (var i = 0, n = columns.length; i < n; i++){
        var column = columns[i];

        column.render();
        this.$el.append( column.$el );
      }
    },

    _getColumnViews: function(){
      var columnViews = [];

      for (var c = 0; c < this.model.totalColumns; c++){
        var columnView = this._createColumnView(c);
        columnViews.push(columnView);
      }

      return columnViews;
    },

    _createColumnView: function(col){
      var cells = this.model.getColumn(col);

      return new App.ColumnView({
        index: col,
        cells: cells,
        onClick: this._columnClicked.bind(this)
      });
    },

    _columnClicked: function(column){
      this.model.activateSymbol('A');
      this.model.dropTo(column);

      console.log( this.model.toString() );
    }

  });

})();
