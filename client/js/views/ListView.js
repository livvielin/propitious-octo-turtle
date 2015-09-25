// Define a view for the list of wikis
var ListView = Backbone.View.extend({

  // Set id for css styling
  id: 'list',

  initialize: function () {
    // Listen for an added wiki to the collection
    // TODO
    this.render();
  },

  render: function () {
    // Empty the list
    this.$el.empty();

    // Iterate through collection, which is a wiki collection
    // Get an array of wiki views
    var entries = this.collection.map(function (model) {
      return new WikiView({ 'model': model }).render();
    });

    // Get the DOM elements for each wiki entry
    var $els = entries.map(function (entry) {
      return entry.$el;
    });

    this.$el.append($els);
  }

});
