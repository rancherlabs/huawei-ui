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
  search: null,
  arrangedContent: function() {
    var search = this.get('search');

    if (!search) {
      return this.get('model');
    }

    return this.get('model').filter((item) => {
      return item.name.indexOf(search) !== -1;
    });
  }.property('model', 'search')
});
