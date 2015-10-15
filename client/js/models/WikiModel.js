// Define a model for a single wiki
var WikiModel = Backbone.Model.extend({
  
  // Set defaults for the model
  defaults: {
    searchTerm: ''
  },

  urlRoot: 'http://localhost:3000/wiki/',

  idAttribute: '_id'

});
