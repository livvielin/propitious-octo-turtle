// Define a collection of WikiModels
var WikiCollection = Backbone.Collection.extend({

  model: WikiModel,

  addWiki: function (wiki) {
    this.add({ searchTerm: wiki });
  }

});
