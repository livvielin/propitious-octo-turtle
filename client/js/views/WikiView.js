// Define a view for individual wikis
var WikiView = Backbone.View.extend({

  model: new WikiModel(),

  events: {
    'click': 'deleteWiki'
  },

  // Set class name for css styling
  className: 'entry',

  template: _.template('<p><%= searchTerm %>: <%= airDate %></p>'),

  initialize: function () {
    this.render();
  },

  deleteWiki: function () {
    this.model.destroy({
      success: function (response) {
        console.log(response);
        console.log('Successfully DELETED wiki with _id: ' + response.id);
      },
      error: function (err) {
        console.log('Failed to DELETE wiki!');
      }
    });
  },

  render: function () {
    // Set the html for the wiki entry
    // Apply the template, getting proper attribute from the model
    this.$el.html(this.template({
      searchTerm: this.model.get('searchTerm'),
      airDate: this.model.get('airDate')
    }));
  }

});
