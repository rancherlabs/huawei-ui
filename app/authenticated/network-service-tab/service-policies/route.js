import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.$.ajax('/hw/servicePolicy', 'GET').then((response) => {
      return response.servicePolicies;
    });
  },
  actions: {
    refreshPolicies: function() {
      this.refresh();
    }
  }
});
