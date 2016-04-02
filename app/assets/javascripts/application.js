//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets

//= require ./underscore-min.js
//= require ./backbone-min.js
//= require ./init.js

//= require ./bot/simple_bot.js
//= require lib
//= require views

$(function(){

  var board = new App.Board(),
      boardView = new App.BoardView({model: board});

  boardView.render();
  $(document.body).append( boardView.$el );

});
