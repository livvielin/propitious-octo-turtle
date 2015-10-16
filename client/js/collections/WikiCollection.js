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
          'url': response.attributes.url
        });
      },
      error: function () {
        console.log('Failed to save wiki!');
      }
    });
  },

  updateWiki: function () {
    var context = this;
    this.each(function (model) {
      console.log('updateWiki');
      model.save(null, {
        success: function (response) {
          model.set('airDate', response.attributes.airDate);
          console.log('Successfully UPDATED wiki with _id: ' + response.id);
        },
        error: function (err) {
          console.log('Failed to UPDATED wiki!');
        }
      });
    });
  }

});
