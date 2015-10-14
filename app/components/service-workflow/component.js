import Ember from 'ember';
import NewOrEdit from 'ui/mixins/new-or-edit';

export default Ember.Component.extend(NewOrEdit, {
  actions: {
    toggleCollapse() {
      if (this.get('services')) {
          this.toggleProperty('collapsed');
      } else {
        var serviceName = this.get('workflow.name');
        Ember.$.ajax(`/hw/serviceWorkflow/view?name=${serviceName}`, 'GET').then((response) => {
          this.toggleProperty('collapsed');
          debugger;
          this.set('services', response.serviceFunctinElements);
          return response;
        }, function( /*error*/ ) {});
      }
    }
  },
  collapsed: true
});
