import Ember from 'ember';
import NewOrEdit from 'ui/mixins/new-or-edit';

export default Ember.Component.extend(NewOrEdit, {
  actions: {
    cancel: function() {
      this.sendAction('dismiss');
    },
    addPolicyDetails() {
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
    }
  },
  subscribers: ['mia', 'bob', 'ted', 'lynn'],
  servicePolicyCount: Ember.computed('savedServicePolicy.[]', function() {
    return this.get('savedServicePolicy').length > 1 ? true : false;
  }),
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
