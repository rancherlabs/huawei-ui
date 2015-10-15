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
  search: '',
  arrangedContent: function() {
    var search = this.get('search').toUpperCase();
    var result = [];

    if (!search) {
      return this.get('model.catalog.serviceFunctions');
    }

    this.get('model.catalog.serviceFunctions').forEach((item) => {
      if (item.name.toUpperCase().indexOf(search) >= 0 || item.description.toUpperCase().indexOf(search) >= 0) {
        result.push(item);
      }
    });
    return result;
  }.property('model.catalog.serviceFunctions', 'search')

});
