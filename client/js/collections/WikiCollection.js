// Define a collection of WikiModels
var WikiCollection = Backbone.Collection.extend({

  model: WikiModel,

  addWiki: function (wiki) {
    var wikiModel = new WikiModel({ searchTerm: wiki });
    this.add({ searchTerm: wiki });
    wikiModel.save(null, {
      success: function (response) {
        console.log('Successfully saved wiki!');
      },
      error: function () {
        console.log('Failed to save wiki!');
      }
    });
  }

});
