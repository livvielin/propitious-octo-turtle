// Define a view for the title of the app
var TitleView = Backbone.View.extend({
  
  el: '<h1>',

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.text('Search Wiki');
  }

});
