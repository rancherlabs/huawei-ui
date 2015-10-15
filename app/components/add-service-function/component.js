import Ember from 'ember';
import NewOrEdit from 'ui/mixins/new-or-edit';

export default Ember.Component.extend(NewOrEdit, {
  catalog: window.lc('authenticated/network-service-tab/service-catalog'),
  actions: {
    cancel: function() {
      this.sendAction('dismiss');
    },
    save: function() {
      var postObj = {
        definationFile: this.get('definationFile'),
        icon: this.get('icon'),
        image: this.get('image'),
        name: this.get('name'),
        description: this.get('description')
      };
      var formData = new FormData();
      _.forEach(postObj, (n, key) => {
        var file = null;
        if (key === 'definationFile') {
          file = Ember.$('#defination-file')[0].files[0];
          formData.append('file', file, file.name);
        } else if (key === 'icon') {
          file = Ember.$('#icon-file')[0].files[0];
          formData.append(key, file, file.name);
        } else {
          formData.append(key, n);
        }
      });
      Ember.$.ajax({
        method: 'POST',
        url: '/hw/serviceFunction/add',
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
      }).then(() => {
        this.sendAction('dismiss');
        this.get('catalog').send('refreshCatalog');
      }, ( /*error*/ ) => {});
    }
  },
  definationFile: null,
  icon: null,
  image: null,
  name: null,
  description: null
});
