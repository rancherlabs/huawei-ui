import Ember from 'ember';
import C from 'ui/utils/constants';

export default Ember.Component.extend({
  containers: null,
  actions: {
    toggleCollapse() {
      if (this.get('containers')) {
        this.toggleProperty('collapsed');
      } else {
        var serviceName = this.get('function.name');
        Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceFunction/view?name=${serviceName}`, 'GET').then((response) => {
          this.toggleProperty('collapsed');
          this.set('containers', response.containers);
          return response;
        }, function( /*error*/ ) {});
      }
    }
  },
  willInsertElement: function() {
    var serviceName = this.get('function.name');
    Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceFunction/view?name=${serviceName}`, 'GET').then((response) => {
      if (!response.containers.length) {
        this.set('collapsed', true);
      }
      this.set('containers', response.containers);
      return response;
    }, function( /*error*/ ) {});
  },
  collapsed: false,
  imageEndpoint: Ember.computed('C.HAUWEI.API_ENDPOINT', function() {
    return C.HAUWEI.API_ENDPOINT;
  }),
});
