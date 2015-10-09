import Ember from 'ember';
import NewOrEdit from 'ui/mixins/new-or-edit';

export default Ember.Component.extend(NewOrEdit, {
  actions: {
    toggleCollapse() {
      this.toggleProperty('collapsed');
    }
  },
  collapsed:false
});
