App.MenuView = Backbone.View.extend({

  events: {
    'click .js-two-player': '_startVsMan',
    'click .js-vs-computer': '_startVsBot'
  },

  _startVsMan: function(e){
    e.preventDefault();
    this._createBoard();
  },

  _startVsBot: function(e){
    e.preventDefault();

    var board = this._createBoard();
    this._addBot(board);
  },

  _createBoard: function(){
    var board = new App.Board(),
        boardView = new App.BoardView({model: board});

    boardView.render();
    $('.js-board-container:first').html( boardView.$el );

    return board;
  },

  _addBot: function(board){
    var bot = new App.SimpleBot( App.Board.PLAYER_2_SYMBOL );
    bot.playOn(board);
  }

});
