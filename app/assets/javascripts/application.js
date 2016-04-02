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
  var menuView = new App.MenuView({el: $('.js-menu:first')[0]});
});
