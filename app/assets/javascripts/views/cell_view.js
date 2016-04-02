App.CellView = Backbone.View.extend({

  className: 'js-cell cell',
  template: _.template("<div class='js-slot slot'></div>"),

  render: function(){
    this.$el.html( this.template() );
    return this;
  }

});
