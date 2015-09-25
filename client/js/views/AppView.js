// Define a view for the whole app
var AppView = Backbone.View.extend({

  // Set the div with app id in index.html as the el
  el: '#app',

  // Instantiate the necessary views that make up the app
  // Note: this.collection is a new WikiCollection, as set up in app.js
  initialize: function () {
    this.title = new TitleView();
    this.input = new InputView({ collection: this.collection });
    this.list = new ListView({ collection: this.collection });
    this.render();
  },

  // Render each view on the page
  render: function () {
    this.$el.append([
      this.title.$el,
      this.input.$el,
      this.list.$el
    ]);
  }

});
