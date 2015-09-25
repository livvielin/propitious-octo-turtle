// Define a view for individual wikis
var WikiView = Backbone.View.extend({

  // Set class name for css styling
  className: 'entry',

  template: _.template('<p>Searching <%= searchTerm %>...</p>'),

  initialize: function () {
    this.render();
  },

  render: function () {
    // Set the html for the wiki entry
    // Apply the template, getting proper attribute from the model
    this.$el.html(this.template({
      searchTerm: this.model.get('searchTerm')
    }));
  }

});
