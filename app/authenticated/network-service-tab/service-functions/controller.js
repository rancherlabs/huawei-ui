import Ember from 'ember';

export default Ember.Controller.extend({
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
