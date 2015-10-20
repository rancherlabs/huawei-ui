import Ember from 'ember';
import C from 'ui/utils/constants';


export default Ember.Route.extend({
  model(params) {
    var newModel = {};
    if (params.catalog) {
      newModel.selectedCatalog = params.catalog;
    }
    return Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceFunction`, 'GET').then((response) => {
      newModel.catalog = response;
      return newModel;
    }, function(/*error*/){});

  },
  actions: {
    refreshCatalog: function() {
      this.refresh();
    }
  }
});
