import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleCollapse() {
      this.toggleProperty('collapsed');
    }
  },
  collapsed:false
});
