App.GameView = Backbone.View.extend({

  className: 'js-game game',
  template: _.template('<div class="js-board-container board-container"></div>'),

  initialize: function(){
    this.listenTo(this.model, 'reset', this.render);
    this._board = this.model.board;
    this._boardView = null;
  },

  render: function(){
    if (this._boardView) this._boardView.remove();

    this.$el.html( this.template() );
    this._appendBoardView();

    return this;
  },

  _appendBoardView: function(){
    this._boardView = this._createBoardView();
    this._boardView.render();

    this.$('.js-board-container:first').append( this._boardView.$el );
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

    switch( this.model.getStatus() ){
      case App.GameStatus.GAME_OVER:
        this._gameOver();
        break;

      case App.GameStatus.DRAW:
        this._draw();
        break;

      case App.GameStatus.ONGOING:
        this._ongoing();
        break;
    }
  },

  _gameOver: function(){
    alert('Game Over');
    this.model.reset();
  },

  _draw: function(){
    alert('Draw!');
    this.model.reset();
  },

  _ongoing: function(){
    // TODO: Do something
  }

});
