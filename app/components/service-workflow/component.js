import Ember from 'ember';
import NewOrEdit from 'ui/mixins/new-or-edit';
import C from 'ui/utils/constants';


export default Ember.Component.extend(NewOrEdit, {
  imageEndpoint: C.HAUWEI.API_ENDPOINT,
  actions: {
    toggleCollapse() {
      if (this.get('services')) {
        this.toggleProperty('collapsed');
      } else {
        var serviceName = this.get('workflow.name');
        Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceWorkflow/view?name=${serviceName}`, 'GET').then((response) => {
          this.toggleProperty('collapsed');
          this.set('services', response.serviceFunctinElements);
          return response;
        }, function( /*error*/ ) {});
      }
    }
  },
  collapsed: true
});
