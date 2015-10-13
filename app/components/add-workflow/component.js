import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectChange(index) {
        if (index === (this.get('serviceFunctions').length - 1)) {
          Ember.run(() => {
            this.get('serviceFunctions').pushObject({
              value: ''
            });
          });
        }
      },
      cancel() {
        this.sendAction('dismiss');
      },
      dragulaEvent() {
        console.log('yeah bitch');
      }
  },
  serviceFunctions: [{
    value: ''
  }, {
    value: ''
  }, {
    value: ''
  }],
  'dragulaconfig': {
    'options': {
      copy: false,
      revertOnSpill: false,
      removeOnSpill: false,
      ignoreInputTextSelection: true,
      moves: function(el, source, handle, sibling) {
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
  }
});
