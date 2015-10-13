import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var newModel = {};
    if (params.catalog) {
      newModel.selectedCatalog = params.catalog;
    }
    return Ember.$.ajax('/hw/serviceFunction', 'GET').then((response) => {
      newModel.catalog = response;
      return newModel;
    }, function(/*error*/){});

  }
});
