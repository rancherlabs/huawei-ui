import Ember from 'ember';
import NewOrEdit from 'ui/mixins/new-or-edit';

export default Ember.Component.extend(NewOrEdit, {
  actions: {
    toggleConfig: function() {
      this.toggleProperty('configShown');
    },
    cancel: function() {
      this.sendAction('dismiss');
    }
  },
  configShown: true,
  scaleValue: 0,
  saving: false

});
