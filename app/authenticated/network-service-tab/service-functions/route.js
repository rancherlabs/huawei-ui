import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.$.ajax('/hw/serviceFunction', 'GET').then((response) => {
      return response.serviceFunctions;
    }, function(/*error*/){});

  }
});
