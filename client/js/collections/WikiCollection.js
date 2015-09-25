// Define a collection of WikiModels
var WikiCollection = Backbone.Collection.extend({

  model: WikiModel,

  url: 'http://localhost:3000/wiki',

  addWiki: function (wiki) {
    var wikiModel = new WikiModel({ searchTerm: wiki });
    this.add({ searchTerm: wiki });

    // POST search term to database
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
