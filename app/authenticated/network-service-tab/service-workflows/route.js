import Ember from 'ember';
import C from 'ui/utils/constants';


export default Ember.Route.extend({
  model() {
    return Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceWorkflow`, 'GET').then((response) => {
      return response.serviceWorkflows;
    }, function(/*error*/){});
  },
  actions: {
    refreshWorkflows: function() {
      this.refresh();
    }
  }
});
