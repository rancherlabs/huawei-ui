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
  },
  search: null,
  arrangedContent: function() {
    var search = this.get('search');

    if (!search) {
      return this.get('model.catalog.serviceFunctions');
    }

    return this.get('model.catalog.serviceFunctions').filter((item) => {
      return item.name.indexOf(search) !== -1;
    });
  }.property('model.catalog.serviceFunctions', 'search')

});
