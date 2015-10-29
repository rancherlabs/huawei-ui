Rancher UI
--------

Perhaps you like managing cattle.

[![Build Status](http://drone.rancher.io/api/badge/github.com/rancher/ui/status.svg?branch=master)](http://drone.rancher.io/github.com/rancher/ui)

## Usage

Prerequisites:
* [Bower](from http://bower.io/)
* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) 0.12.x (with NPM)

If you're on a Mac and use Homebrew, you can follow these steps:
```bash
  brew install node watchman
  npm install -g bower
```

Setup:
```bash
  git clone 'https://github.com/rancherlabs/huawei-ui'
  cd 'huawei-ui'
  mkdir ui
  mv * /ui
  cd 'ui'
  git submodule init
  git submodule update
  npm install
  bower install
```

Run development server:
```bash
  npm start
```

Connect to UI at http://localhost:8000/ .  The server automatically picks up file changes, restarts itself, and reloads the web browser.

Run development server pointed at another instance of the Rancher API
```bash
  RANCHER_ENDPOINT="http://rancher:8080/" npm start
```

RANCHER_ENDPOINT can also be `hostname[:8080]` or `ip[:8080]`.


### Point Rancher to UI
* Navigate to `http://<your.rancher.ip>:8080/v1/activesettings/1as!api.ui.index`
* Select `edit` from the menu on the right
* change the default value of `loacl` to `//releases.rancher.com/ui/huawei`
* Select `show request`
* Select `send request`
* Refresh and ensure the new value is present 

### Add  New API to proxy 
* Navigate to `http://<your.rancher.ip>:8080/v1/activesettings/1as!api.proxy.whitelist`
* Select `edit` from the menu on the right
* Add the new ip for the new api server to the end of the list
* Select `show request`
* Select `send request`
* Refresh and ensure the new value is present 
* See the next section to add the api endpoint to the UI

### Add New API Endpoint to UI
* Navigate to `http://<your.rancher.ip>:8080/v1/settings`
* Select `create` from the menu on the right
* Enter the name `huawei.endpoint` in the name field
* Enter the ip (e.g `http://0.0.0.0:80`) in the value field *note: you do not actually need the port if the api is running on 80*
* Select `show request`
* Select `send request`
* Refresh and ensure the new value is present 

### Compiling for distribution

The built-in cattle server expects to be run from `/static/` and hosted on a CDN.  To generate the CDN files, run:
```bash
  ./scripts/build-static
```

### Running Tests

```bash
  npm install -g ember-cli
```

* `ember test`
* `ember test`
* `ember test --server`

### Bugs & Issues
Please submit bugs and issues to [rancher/rancher](//github.com/rancher/rancher/issues) with a title starting with `[UI] `.

Or just [click here](//github.com/rancher/rancher/issues/new?title=%5BUI%5D%20) to create a new issue.


#### Useful links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

License
=======
Copyright (c) 2014-2015 [Rancher Labs, Inc.](http://rancher.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
