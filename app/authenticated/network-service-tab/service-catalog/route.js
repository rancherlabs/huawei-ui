import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var newModel = {};
    if (params.catalog) {
      newModel.selectedCatalog = params.catalog;
    }
    return Ember.$.ajax('/v1/proxy/45.55.19.219:8080/com.huawei.dockerMSD', 'GET').then((response) => {
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
