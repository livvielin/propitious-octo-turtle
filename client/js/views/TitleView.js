// Define a view for the title of the app
var TitleView = Backbone.View.extend({
  
  el: '<h1>',

  initialize: function () {
    // Immediately render title view
    this.render();
  },

  render: function () {
    this.$el.text('Search Wiki');
  }

});
