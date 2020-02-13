fiddle-0037-EntAgGridStateManagement
======


### Title<a name="title"></a>

Enterprise AgGrid Custom ToolTips


### Creation Date<a name="createDate"></a>

02-11-20


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[Issue 345](https://github.com/bradyhouse/house/issues/345)


### Description<a name="description"></a>

I need a fiddle exploring how to add custom tooltip to a grid.  When the user mouses overs a given a cell, the formula used to calculate the value needs to be displayed. Use Fiddle 35 as the starting point -- ie the grid should be configured to display Master & Detail data.  As reference, see https://www.ag-grid.com/javascript-grid-tooltip-component/#registering-custom-tooltip-components. 


### Use Case<a name="use-case"></a>

1.  Complete the [fiddle bash/alias setup procedure](https://github.com/bradyhouse/house/wiki/Setup-(Mac-OS))
2.  Obtain an Ag-grid enterprise (or evaluation) license
3.  Update the [license.json](license.json)


Note - the fiddle will still work without a license.  However, you will see an error in the console (see below).

        ****************************************************************************************************************
        *************************************** ag-Grid Enterprise License *********************************************
        ********************************************* Invalid License **************************************************
        * Your license for ag-Grid Enterprise is not valid - please contact accounts@ag-grid.com to obtain a valid license. *
        ****************************************************************************************************************
        ****************************************************************************************************************

4.  Startup the fiddle -- `fiddle start angular2-cli 0036` 

        {{ ʕ・ɭ・ʔ }}

        FIDDLE-START.SH
        ├────STARTSERVER
        ├────NGINSTALL
        ├────NGSTART
        ├────NVMINSTALL
        v10.9.0 is already installed.
        Now using node v10.9.0 (npm v6.2.0)
        ├────NPMINSTALL
        npm WARN deprecated @angular/http@5.2.11: Package no longer supported. Use @angular/common instead, see https://angular.io/guide/deprecations#angularhttp
        npm WARN deprecated core-js@2.6.11: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
        npm WARN deprecated circular-json@0.5.9: CircularJSON is in maintenance only, flatted is its successor.
        npm WARN deprecated nodemailer@2.7.2: All versions below 4.0.1 of Nodemailer are deprecated. See https://nodemailer.com/status/
        npm WARN deprecated browserslist@2.11.3: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
        npm WARN deprecated uws@9.14.0: stop using this version
        npm WARN deprecated mailcomposer@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.9: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
        npm WARN deprecated buildmail@4.0.1: This project is unmaintained

        > fsevents@1.2.11 install /Users/bradyhouse/github/house_master/fiddles/angular2-cli/fiddle-0037-EntAgGridStateManagement/node_modules/fsevents
        > node-gyp rebuild

          SOLINK_MODULE(target) Release/.node
          CXX(target) Release/obj.target/fse/fsevents.o
          SOLINK_MODULE(target) Release/fse.node

        > uws@9.14.0 install /Users/bradyhouse/github/house_master/fiddles/angular2-cli/fiddle-0037-EntAgGridStateManagement/node_modules/uws
        > node-gyp rebuild > build_log.txt 2>&1 || exit 0


        > node-sass@4.13.1 install /Users/bradyhouse/github/house_master/fiddles/angular2-cli/fiddle-0037-EntAgGridStateManagement/node_modules/node-sass
        > node scripts/install.js

        Cached binary found at /Users/bradyhouse/.npm/node-sass/4.13.1/darwin-x64-64_binding.node

        > core-js@2.6.11 postinstall /Users/bradyhouse/github/house_master/fiddles/angular2-cli/fiddle-0037-EntAgGridStateManagement/node_modules/core-js
        > node -e "try{require('./postinstall')}catch(e){}"

        Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

        The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
        > https://opencollective.com/core-js
        > https://www.patreon.com/zloirock

        Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


        > ejs@2.7.4 postinstall /Users/bradyhouse/github/house_master/fiddles/angular2-cli/fiddle-0037-EntAgGridStateManagement/node_modules/ejs
        > node ./postinstall.js

        Thank you for installing EJS: built with the Jake JavaScript build tool (https://jakejs.com/)


        > uglifyjs-webpack-plugin@0.4.6 postinstall /Users/bradyhouse/github/house_master/fiddles/angular2-cli/fiddle-0037-EntAgGridStateManagement/node_modules/webpack/node_modules/uglifyjs-webpack-plugin
        > node lib/post_install.js


        > node-sass@4.13.1 postinstall /Users/bradyhouse/github/house_master/fiddles/angular2-cli/fiddle-0037-EntAgGridStateManagement/node_modules/node-sass
        > node scripts/build.js

        Binary found at /Users/bradyhouse/github/house_master/fiddles/angular2-cli/fiddle-0037-EntAgGridStateManagement/node_modules/node-sass/vendor/darwin-x64-64/binding.node
        Testing binary
        Binary is fine
        npm notice created a lockfile as package-lock.json. You should commit this file.
        npm WARN bootstrap@4.4.1 requires a peer of popper.js@^1.16.0 but none is installed. You must install peer dependencies yourself.

        added 1459 packages from 1316 contributors and audited 14283 packages in 279.249s
        found 33 vulnerabilities (5 low, 20 moderate, 8 high)
          run `npm audit fix` to fix them, or `npm audit` for details
        ** NG Live Development Server is listening on localhost:1841, open your browser on http://localhost:1841/ **
        Date: 2020-02-07T17:52:49.116Z
        Hash: 6460d665f551f58d50f8
        Time: 16267ms
        chunk {inline} inline.bundle.js (inline) 3.85 kB [entry] [rendered]
        chunk {main} main.bundle.js (main) 40.8 kB [initial] [rendered]
        chunk {polyfills} polyfills.bundle.js (polyfills) 597 kB [initial] [rendered]
        chunk {scripts} scripts.bundle.js (scripts) 4.01 MB [initial] [rendered]
        chunk {styles} styles.bundle.js (styles) 981 kB [initial] [rendered]
        chunk {vendor} vendor.bundle.js (vendor) 18 MB [initial] [rendered]

        webpack: Compiled successfully.
                
5.  Using Chrome, navigate to [localhost:1841](http://localhost:1841)


### Published Version Link<a name="published-version-link"></a>

* [bradyhouse.io](http://bradyhouse.github.io/angular2-cli/fiddle-0037-EntAgGridStateManagement/index.html)


### Angular Version<a name="angular-version">

This fiddle was created using a mac configured as follows.

            _                      _                 ____ _     ___
           / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
          / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
         / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
        /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                        |___/

        Angular CLI: 1.7.4
        Node: 10.9.0
        OS: darwin x64
        Angular:
        ...


### Reference <a name="reference"></a>

Page referenced while building this fiddle:

* https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow
* https://www.ag-grid.com/javascript-grid-tooltip-component/#example-custom-tooltip


### Tags<a name="tags"></a>

node, angular 5.2.1, @ag-grid-community/core, @ag-grid-community/allModules, @ag-grid-enterprise/allModules, bootstrap


### Forked From

[fiddle-0035-EntAgGridHierarchicalExport](../fiddle-0035-EntAgGridHierarchicalExport)


### Forked From

[fiddle-0036-EntAgGridToolTips](../fiddle-0036-EntAgGridToolTips)
