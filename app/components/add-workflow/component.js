import Ember from 'ember';
import C from 'ui/utils/constants';

export default Ember.Component.extend({
  workflows: window.lc('authenticated/network-service-tab/service-workflows'),
  willInsertElement: function() {
    Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceFunction`, 'GET').then((response) => {
      return this.set('functions', response.serviceFunctions);
    });
  },
  actions: {
    selectChange: function(index) {
      var selectedIndex = index;
      var selectValue = Ember.$(`[name=item-${index}]`).val();
      this.get('serviceWorkflowElements').find((item, index) => {
        if (index === selectedIndex) {
          return item.serviceFunctionName = selectValue;
        }
      });
      if (index === (this.get('serviceWorkflowElements').length - 1)) {
        Ember.run(() => {
          this.get('serviceWorkflowElements').pushObject({
            serviceFunctionName: ''
          });
        });
      }
    },
    cancel() {
      this.sendAction('dismiss');
    },
    dragulaEvent() {
      console.log('yeah bitch');
    },
    save: function() {
      var postObj = {
        name: this.get('name'),
        description: this.get('description'),
        serviceWorkflowElements: []
      };
      _.forEach(this.get('serviceWorkflowElements'), (item) => {
        if (item.serviceFunctionName !== '') {
          postObj.serviceWorkflowElements.push(item);
        }
      });
      Ember.$.ajax({
        method: 'POST',
        url: `/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceWorkflow/add`,
        headers: {
          'Accept': 'application/json',
          'X-API-Headers-Restrict': 'Content-Length',
          'x-api-csrf': Ember.$.cookie('CSRF')
        },
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false,
        data: JSON.stringify(postObj)
      }).then(() => {
        this.sendAction('dismiss');
        this.get('workflows').send('refreshWorkflows');
      }, ( /*error*/ ) => {});
    }
  },
  serviceWorkflowElements: [{
    serviceFunctionName: ''
  }, {
    serviceFunctionName: ''
  }, {
    serviceFunctionName: ''
  }],
  'dragulaconfig': {
    'options': {
      copy: false,
      revertOnSpill: false,
      removeOnSpill: false,
      ignoreInputTextSelection: true,
      moves: function(el, source, handle) {
        if ($(handle).hasClass('fa-bars')) {
          return true;
        } else {
          return false;
        }
      }

      //Other options from the dragula source page.
    },
    'eventList': [{
        name: 'drag'
      }, {
        name: 'drop'
      }] // all the events that you want to listen to. TBD - will make this simpler.
  },
  name: null,
  description: null
});
