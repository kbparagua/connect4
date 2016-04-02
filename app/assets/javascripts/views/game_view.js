App.GameView = Backbone.View.extend({

  className: 'js-game game',
  template: _.template('<div class="js-board-container board-container"></div>'),

  initialize: function(){
    this._board = this.model.board;
  },

  render: function(){
    this.$el.html( this.template() );
    this._appendBoard();

    return this;
  },

  _appendBoard: function(){
    var boardView = new App.BoardView({model: this._board});
    boardView.render();

    this.$('.js-board-container:first').append( boardView.$el );
  }

});
