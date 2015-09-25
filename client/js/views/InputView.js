// Define a view for the user input box
var InputView = Backbone.View.extend({
  
  // Set view as an input box
  tagName: 'input',

  // Listen for keypresses on the DOM
  events: {
    'keypress': 'keyAction'
  },

  initialize: function () {
    // Immediately render input view
    this.render();
  },

  render: function () {
    this.$el.attr('placeholder', 'Search');
  },

  // Listen specifically for the 'enter' key on a keypress
  keyAction: function (e) {
    if (e.which === 13) {
      // Do something with the input
      // TODO

      // Empty the text box
      this.$el.val('');
    }
  }

});
