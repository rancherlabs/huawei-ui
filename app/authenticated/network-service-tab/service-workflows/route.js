import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.$.ajax('/hw/serviceWorkflow', 'GET').then((response) => {
      return response.serviceWorkflows;
    }, function(/*error*/){});
  }
});
