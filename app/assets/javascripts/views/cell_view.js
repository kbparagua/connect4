App.CellView = Backbone.View.extend({

  className: 'js-cell cell',
  template: _.template("<div class='js-slot slot <%- markClass %>'></div>"),

  initialize: function(){
    this._marked = false;
  },

  render: function(){
    this.$el.html( this.template({markClass: this._markClass()}) );
    return this;
  },

  mark: function(){
    this._marked = true;
    this.render();
  },

  _markClass: function(){
    return this._marked ? 'marked' : '';
  }



});
