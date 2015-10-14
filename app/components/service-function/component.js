import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleCollapse() {
      if (this.get('containers')) {
          this.toggleProperty('collapsed');
      } else {
        var serviceName = this.get('function.name');
        Ember.$.ajax(`/hw/serviceFunction/view?name=${serviceName}`, 'GET').then((response) => {
          this.toggleProperty('collapsed');
          this.set('containers', response.containers);
          return response;
        }, function( /*error*/ ) {});
      }
    }
  },
  collapsed: true
});
