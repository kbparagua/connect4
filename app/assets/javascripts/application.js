//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets

//= require ./underscore-min.js
//= require ./backbone-min.js
//= require ./init.js

//= require lib
//= require views

$(function(){

  var game = new App.Game(),
      gameView = new App.GameView({model: game});

  gameView.render();
  $(document.body).append( gameView.$el );

});
