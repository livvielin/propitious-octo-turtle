// Define a view for the list of wikis
var ListView = Backbone.View.extend({

  // Set id for css styling
  id: 'list',

  initialize: function () {
    // Listen for an added wiki to the collection
    this.listenTo(this.collection, 'add', this.getData);
    // Listen for a removed wiki to the collection
    this.listenTo(this.collection, 'remove', this.getData);
    this.listenTo(this.collection, 'change:airDate', this.render);
    this.getData();
  },

  getData: function () {
    // GET collection data from database
    var context = this;
    this.collection.fetch({
      success: function (response) {
        console.log('Successfully got wiki data!');
        context.collection.updateWiki();
        // Render on startup
        // Passed as callback so collection will sync with db before rendering
        context.render();
      }
    });
  },

  render: function () {
    // Empty the list
    this.$el.empty();

    // Iterate through collection, which is a wiki collection
    // Get an array of wiki views
    var entries = this.collection.map(function (model) {
      return new WikiView({ 'model': model });
    });

    // Get the DOM elements for each wiki entry
    var $els = entries.map(function (entry) {
      return entry.$el;
    });

    this.$el.append($els);
  }

});
