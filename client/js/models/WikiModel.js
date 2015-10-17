// Define a model for a single wiki
var WikiModel = Backbone.Model.extend({
  
  // Set defaults for the model
  defaults: {
    searchTerm: '',
    airDate: '',
    url: ''
  },

  // urlRoot: 'http://localhost:3000/wiki/',
  urlRoot: 'https://mysterious-sea-9712.herokuapp.com/wiki',

  idAttribute: '_id'

});
