// Define a collection of WikiModels
var WikiCollection = Backbone.Collection.extend({

  model: WikiModel,

  url: 'http://localhost:3000/wiki',

  addWiki: function (wiki) {
    var context = this;
    // Format input by capitalizing first letters
    var showTitle = wiki;
    var showTitleSplit = showTitle.split(' ');
    for (var i = 0; i < showTitleSplit.length; i++) {
      showTitleSplit[i] = showTitleSplit[i][0].toUpperCase() + showTitleSplit[i].substring(1);
    }
    var formattedTitle = showTitleSplit.join(' ');

    // Instantiate a new wiki model to save to the database
    var wikiModel = new WikiModel({ 'searchTerm': formattedTitle });
    // POST search term to database
    wikiModel.save(null, {
      success: function (response) {
        console.log('Successfully saved wiki!');
        console.log(response);
        context.add({
          'searchTerm': response.attributes.searchTerm,
          'airDate': response.attributes.airDate,
          'tvUrl': response.attributes.url
        });
      },
      error: function () {
        console.log('Failed to save wiki!');
      }
    });
  },

  updateWiki: function () {
    this.each(function (model) {
      // Get model's url for HTTPS get request
      var url = model.get('url');
      console.log(url);
      // model.set('airDate', '10/28/15');
    });
  }

});
