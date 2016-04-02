App.GameView = Backbone.View.extend({

  className: 'js-game game',
  template: _.template('<div class="js-board-container board-container"></div>'),

  initialize: function(){
    this._board = this.model.board;
  },

  render: function(){
    this.$el.html( this.template() );
    this._appendBoardView();

    return this;
  },

  _appendBoardView: function(){
    var boardView = this._createBoardView();
    boardView.render();

    this.$('.js-board-container:first').append( boardView.$el );
  },

  _createBoardView: function(){
    var view =
      new App.BoardView({
        model: this._board,
        onColumnClick: this._columnClicked.bind(this)
      });

    return view;
  },

  _columnClicked: function(column){
    this.model.dropTo(column);
  }

});
