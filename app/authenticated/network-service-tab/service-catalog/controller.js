import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  actions: {
    add() {
      this.get('controllers.application').setProperties({
        addServiceFunction: true,
        originalModel: this.get('model'),
      });
    },
    launch(model) {
      this.get('controllers.application').setProperties({
        newServiceFunction: true,
        originalModel: model,
      });
    }
  }
});
