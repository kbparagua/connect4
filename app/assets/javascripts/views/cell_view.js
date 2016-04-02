App.CellView = Backbone.View.extend({

  className: 'js-cell cell',
  template: _.template("<div class='js-disc disc <%- discType %>'></div>"),

  render: function(){
    this.$el.html( this.template({discType: this._discTypeClass()}) );
    return this;
  },

  setModel: function(model){
    this.model = model;
    this.render();
  },

  _discTypeClass: function(){
    if ( !this.model ) return '';
    return 'disc-type-' + this.model.value;
  }



});
