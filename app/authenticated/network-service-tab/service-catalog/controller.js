import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  actions: {
    add() {
      this.get('controllers.application').setProperties({
        newServiceFunction: true,
        originalModel: this.get('model'),
      });
    }
  }
});
