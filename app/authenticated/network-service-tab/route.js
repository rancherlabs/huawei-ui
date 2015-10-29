import Ember from 'ember';
import C from 'ui/utils/constants';

export default Ember.Route.extend({
  model: function() {
    return this.get('store').find('setting','huawei.endpoint').then((result) => {
      return C.HAUWEI.API_ENDPOINT = result.value;
    });
  }
});
