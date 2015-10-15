// Define a model for a single wiki
var WikiModel = Backbone.Model.extend({
  
  // Set defaults for the model
  defaults: {
    searchTerm: '',
    airDate: '',
    url: ''
  },

  urlRoot: 'http://localhost:3000/wiki/',

  idAttribute: '_id'

});
