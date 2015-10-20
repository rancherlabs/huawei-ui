import Ember from 'ember';
import C from 'ui/utils/constants';

export default Ember.Route.extend({
  model() {
    return Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceFunction`, 'GET').then((response) => {
      return response.serviceFunctions;
    }, function(/*error*/){});

  }
});
