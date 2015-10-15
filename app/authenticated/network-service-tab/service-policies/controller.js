import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  actions: {
    add() {
      this.get('controllers.application').setProperties({
        addPolicy: true,
        originalModel: this.get('model'),
      });
    }
  },
  search: '',
  arrangedContent: function() {
    var search = this.get('search').toUpperCase();
    var result = [];

    if (!search) {
      return this.get('model');
    }

    this.get('model').forEach((item) => {
      if (item.name.toUpperCase().indexOf(search) >= 0) {
        result.push(item);
      }
    });
    return result;
  }.property('model', 'search')
});
