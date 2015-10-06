import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    this.transitionTo('authenticated.network-service-tab.service-catalog');
  }
});
