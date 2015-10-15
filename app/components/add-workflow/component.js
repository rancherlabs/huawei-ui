import Ember from 'ember';

export default Ember.Component.extend({
  workflows: window.lc('authenticated/network-service-tab/service-workflows'),
  willInsertElement: function() {
    Ember.$.ajax('/hw/serviceFunction', 'GET').then((response) => {
      return this.set('functions', response.serviceFunctions);
    });
  },
  actions: {
    selectChange: function(index) {
      var selectedIndex = index;
      var selectValue = Ember.$(`[name=item-${index}]`).val();
      this.get('serviceWorkflowElements').find((item, index, enumerable) => {
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
      }
      _.forEach(this.get('serviceWorkflowElements'), (item) => {
        if (item.serviceFunctionName !== '') {
          postObj.serviceWorkflowElements.push(item);
        }
      });
      Ember.$.ajax({
        method: 'POST',
        url: '/hw/serviceWorkflow/add',
        data: JSON.stringify(postObj),
      }).then(() => {
        this.sendAction('dismiss');
        this.get('workflows').send('refreshWorkflows')
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
