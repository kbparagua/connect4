App.CellView = Backbone.View.extend({

  className: 'js-cell cell',
  template: _.template("<div class='js-disc disc <%- discType %>'></div>"),

  initialize: function(options){
    this._type = null;
  },

  render: function(){
    this.$el.html( this.template({discType: this._discTypeClass()}) );
    return this;
  },

  setType: function(type){
    this._type = type;
    this.render();
  },

  _discTypeClass: function(){
    if ( !this._type ) return '';
    return 'disc-type-' + this._type;
  }

});
