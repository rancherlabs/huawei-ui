import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectChange(index) {
      if (index === (this.get('serviceFunctions').length - 1)) {
        Ember.run(() => {
          this.get('serviceFunctions').pushObject({value: ''});
        });
      }
    }
  },
  serviceFunctions: [
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    }
  ]
});
