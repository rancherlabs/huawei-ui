import Ember from 'ember';
import NewOrEdit from 'ui/mixins/new-or-edit';
import C from 'ui/utils/constants';

export default Ember.Component.extend(NewOrEdit, {
  policy: window.lc('authenticated/network-service-tab/service-policies'),
  willInsertElement: function() {
    return Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/subscriber`, 'GET').then((response) => {
      this.set('subscribers', response.Subcribers);
      return Ember.$.ajax(`/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceWorkflow`, 'GET').then((response) => {
        return this.set('workflows', response.serviceWorkflows);
      });
    });
  },
  actions: {
    cancel: function() {
      this.sendAction('dismiss');
    },
    addPolicyDetails: function() {
      Ember.run(()=> {
        this.get('savedServicePolicy').pushObject(
          {
            servicePolicyName: '',
            type: '',
            imsi: '',
            serviceWorkflowName: ''
          }
        );
      });
    },
    removePolicyDetails: function(index) {
      Ember.run(()=> {
        this.get('savedServicePolicy').removeAt(index);
      });
    },
    save: function() {
      var postObj = {
        servicePolicyName: this.get('name'),
        type: Ember.$('[name=subscriber]').val(),
        IMSI: Ember.$('[name=imsi]').val(),
        serviceWorkflowName: Ember.$('[name=workflow-name]').val(),
        description: this.get('description')
      };
      Ember.$.ajax({
        method: 'POST',
        url: `/v1/proxy/${C.HAUWEI.API_ENDPOINT}/servicePolicy/add`,
        data: JSON.stringify(postObj),
      }).then(() => {
        this.sendAction('dismiss');
        this.get('policy').send('refreshPolicies');
      }, ( /*error*/ ) => {});
    }
  },
  name: null,
  description: null,
  servicePolicyCount: Ember.computed('savedServicePolicy.[]', function() {
    return this.get('savedServicePolicy').length > 1 ? true : false;
  }),
  count: function() {
    return this.get('savedServicePolicy').length-1;
  }.property('savedServicePolicy'),
  savedServicePolicy: [
    {
      servicePolicyName: '',
      type: '',
      imsi: '',
      serviceWorkflowName: ''
    }
  ],
  types: [
    {
      name: 'Subscriber',
      value: 0
    },
    {
      name: 'Request',
      value: '1'
    }
  ],
  policies: [
    {
      name: 'Subscriber'
    },
    {
      name: 'Location'
    },
    {
      name: 'Content Type'
    },
    {
      name: 'Protocol'
    },
  ]
});
