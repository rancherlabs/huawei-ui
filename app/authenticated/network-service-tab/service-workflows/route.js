import Ember from 'ember';
import C from 'ui/utils/constants';


export default Ember.Route.extend({
  model() {
    return Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceWorkflow`, 'GET').then((response) => {
      //var workflows = response.serviceWorkflows;
      //var promises = [];
      //workflows.forEach((workflow, index, arr) => {
        //var serviceName = workflow.name;
        //promises.push(Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceWorkflow/view?name=${serviceName}`, 'GET'));
      //});
      //Ember.RSVP.all(promises).then((results) => {
        //debugger;
      //});

      return response.serviceWorkflows;
    }, function(/*error*/){});
  },
  actions: {
    refreshWorkflows: function() {
      this.refresh();
    }
  }
});
