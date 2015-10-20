import Ember from 'ember';
import C from 'ui/utils/constants';

export default Ember.Route.extend({
  model: function() {
    return Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/servicePolicy`, 'GET').then((response) => {
      return response.servicePolicies;
    });
  },
  actions: {
    refreshPolicies: function() {
      this.refresh();
    }
  }
});
