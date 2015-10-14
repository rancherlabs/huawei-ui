import Ember from 'ember';
import NewOrEdit from 'ui/mixins/new-or-edit';

export default Ember.Component.extend(NewOrEdit, {
  actions: {
    toggleConfig: function() {
      this.toggleProperty('configShown');
    },
    cancel: function() {
      this.sendAction('dismiss');
    },
    save: function() {
      var configParams = {};
      this.get('configParams').forEach((item) => {
        return configParams[item.name] = item.value;
      });
      var postObj = {
        serviceFunctionName: this.get('serviceFunction.name'),
        serviceFunctionInstanceName: this.get('serviceFunctionInstanceName'),
        scale: this.get('scale'),
        config_params: configParams
      };
      Ember.$.ajax({
        method: 'POST',
        url: '/hw/serviceFunction/deploy',
        data: postObj,
      }).then(() => {
        this.sendAction('dismiss');
      }, ( /*error*/ ) => {});
    }
  },
  configShown: true,
  scale: 0,
  saving: false,
  serviceFunction: Ember.computed.alias('originalModel'),
  serviceFunctionInstanceName: null,
  configParams: Ember.computed('serviceFunction.config_params', function() {
    var nObj = [];
    _.forEach(this.get('serviceFunction.config_params'), (n, key) => {
      return nObj.push({
        name: key,
        value: n
      });
    });
    return nObj;
  })


});
