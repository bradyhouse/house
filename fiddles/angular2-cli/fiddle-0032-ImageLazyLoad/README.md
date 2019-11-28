fiddle-0032-ImageLazyLoad
======


### Title

fiddle-0032-ImageLazyLoad


### Creation Date

11-26-19


### Location

Chicago, IL


### Issue

[Issue 328](https://github.com/bradyhouse/house/issues/328)


### Description

[brady.house](https://brady.house) is crap.  Even if you forgive my minimalist design moment, the images don't load smoothly.  I have a 100+ canvas photos that I want add to the page, but before I can do that I need to at a `minimum` fix how it loads images.  Time for a fiddle.  As a starting point see [Dynamic Image Loading With Angular](https://medium.com/allenhwkim/simple-lazy-loading-with-angular-716dd3b174a). 


### Use Case<a name="use-case"></a>

1.  Complete the [fiddle bash/alias setup procedure](https://github.com/bradyhouse/house/wiki/Setup-(Mac-OS))
2.  Startup the fiddle -- `fiddle start angular2-cli 0032` 

        {{ ʕ・ɭ・ʔ }}

        FIDDLE-START.SH
        ├────STARTSERVER
        ├────NGINSTALL
        ├────NGSTART
        ├────NVMINSTALL
        v10.9.0 is already installed.
        Now using node v10.9.0 (npm v6.2.0)
        ├────NPMINSTALL

        > fsevents@1.2.9 install /Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/@angular/compiler-cli/node_modules/fsevents
        > node install

        node-pre-gyp WARN Using request for node-pre-gyp https download
        [fsevents] Success: "/Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/@angular/compiler-cli/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" is installed via remote

        > fsevents@1.2.9 install /Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/karma/node_modules/fsevents
        > node install

        node-pre-gyp WARN Using request for node-pre-gyp https download
        [fsevents] Success: "/Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/karma/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" is installed via remote

        > fsevents@1.2.9 install /Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/watchpack/node_modules/fsevents
        > node install

        node-pre-gyp WARN Using request for node-pre-gyp https download
        [fsevents] Success: "/Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/watchpack/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" is installed via remote

        > fsevents@1.2.9 install /Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/webpack-dev-server/node_modules/fsevents
        > node install

        node-pre-gyp WARN Using request for node-pre-gyp https download
        [fsevents] Success: "/Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/webpack-dev-server/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" is installed via remote

        > core-js@2.6.10 postinstall /Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/babel-runtime/node_modules/core-js
        > node postinstall || echo "ignore"

        Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

        The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
        > https://opencollective.com/core-js
        > https://www.patreon.com/zloirock

        Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


        > core-js@3.2.1 postinstall /Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/core-js
        > node scripts/postinstall || echo "ignore"

        Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

        The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
        > https://opencollective.com/core-js
        > https://www.patreon.com/zloirock

        Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


        > core-js@2.6.10 postinstall /Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/karma/node_modules/core-js
        > node postinstall || echo "ignore"


        > @angular/cli@8.3.19 postinstall /Users/bradyhouse/github/house_328/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad/node_modules/@angular/cli
        > node ./bin/postinstall/script.js

        added 1464 packages from 1075 contributors and audited 18875 packages in 44.157s
        found 0 vulnerabilities

        10% building 3/3 modules 0 activeℹ ｢wds｣: Project is running at http://localhost:1841/webpack-dev-server/
        ℹ ｢wds｣: webpack output is served from /
        ℹ ｢wds｣: 404s will fallback to //index.html

        chunk {main} main.js, main.js.map (main) 33.5 kB [initial] [rendered]
        chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 264 kB [initial] [rendered]
        chunk {runtime} runtime.js, runtime.js.map (runtime) 6.15 kB [entry] [rendered]
        chunk {scripts} scripts.js, scripts.js.map (scripts) 86.1 kB [entry] [rendered]
        chunk {styles} styles.js, styles.js.map (styles) 1.23 MB [initial] [rendered]
        chunk {vendor} vendor.js, vendor.js.map (vendor) 4.4 MB [initial] [rendered]
        Date: 2019-11-28T02:49:54.145Z - Hash: 0cb47d0608d5167e4473 - Time: 15860ms
        ** Angular Live Development Server is listening on localhost:1841, open your browser on http://localhost:1841/ **
        ℹ ｢wdm｣: Compiled successfully.
        
3.  Using Chrome, navigate to [localhost:1841](http://localhost:1841)
      
            
### Published Version Link<a name="published-version-link"></a>

* [bradyhouse.io](http://bradyhouse.github.io/angular2-cli/fiddle-0032-ImageLazyLoad/index.html)


### Angular Version<a name="angular-version">

This fiddle was created using a mac configured as follows.

        Angular CLI: 8.3.19
        Node: 10.9.0
        OS: darwin x64
        Angular: 8.2.14
        ... animations, common, compiler, compiler-cli, core, forms
        ... language-service, platform-browser, platform-browser-dynamic
        ... router

        Package                           Version
        -----------------------------------------------------------
        @angular-devkit/architect         0.803.19
        @angular-devkit/build-angular     0.803.19
        @angular-devkit/build-optimizer   0.803.19
        @angular-devkit/build-webpack     0.803.19
        @angular-devkit/core              8.3.19
        @angular-devkit/schematics        8.3.19
        @angular/cli                      8.3.19
        @ngtools/webpack                  8.3.19
        @schematics/angular               8.3.19
        @schematics/update                0.803.19
        rxjs                              6.4.0
        typescript                        3.5.3
        webpack                           4.39.2    


### Tags<a name="tags">

node, angular, angular-cli, ngx-bootstrap, typescript, rxjs, webpack, ng-contanger, ngTemplateOutlet
