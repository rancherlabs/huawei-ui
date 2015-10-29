import Ember from 'ember';
import NewOrEdit from 'ui/mixins/new-or-edit';
import C from 'ui/utils/constants';


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
        url: `/v1/proxy/${C.HAUWEI.API_ENDPOINT}/serviceFunction/add`,
        data: formData,
        headers: {
          'Accept': 'application/json',
          'X-API-Headers-Restrict': 'Content-Length',
          'x-api-csrf': Ember.$.cookie('CSRF')
        },
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
  description: null,
  readableDefPath: Ember.computed('definationFile', function() {
    var out;
    Ember.run(() => {
      out = this.parsePath(this.get('definationFile'));
    });
    return out;
  }),
  readableImagePath: Ember.computed('icon', function() {
    var out;
    Ember.run(() => {
     out = this.parsePath(this.get('icon'));
    });
    return out;
  }),
  parsePath: function(path) {
    var out;
    if (path) {
      out = path.split('\\');
    }
    return out ? out[out.length-1] : null;
  },
});
