fiddle-0033-AgGridMasterDetail
======


### Title<a name="title></a>

AgGrid Master Detail


### Creation Date<a name="createDate"></a>

01-27-20


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[Issue 333](https://github.com/bradyhouse/house/issues/333)


### Description<a name="description></a>

I need an AgGrid fiddle that explores master / detail feature.  See => [https://www.ag-grid.com/javascript-grid-server-side-model-master-detail/](https://www.ag-grid.com/javascript-grid-server-side-model-master-detail/). 


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

4.  Startup the fiddle -- `fiddle start angular2-cli 0033` 

      {{ ʕ・ɭ・ʔ }}

      FIDDLE-START.SH
      ├────STARTSERVER
      ├────NGINSTALL
      ├────NGSTART
      ├────NVMINSTALL
      v10.9.0 is already installed.
      Now using node v10.9.0 (npm v6.2.0)
      ├────NPMINSTALL
      npm WARN bootstrap@4.4.1 requires a peer of popper.js@^1.16.0 but none is installed. You must install peer dependencies yourself.

      audited 14287 packages in 9.918s
      found 29 vulnerabilities (5 low, 20 moderate, 4 high)
        run `npm audit fix` to fix them, or `npm audit` for details
      ** NG Live Development Server is listening on localhost:1841, open your browser on http://localhost:1841/ **
      Date: 2020-01-28T10:35:32.537Z
      Hash: 23d5659d5f4b1b90387a
      Time: 12027ms
      chunk {inline} inline.bundle.js (inline) 3.85 kB [entry] [rendered]
      chunk {main} main.bundle.js (main) 26.3 kB [initial] [rendered]
      chunk {polyfills} polyfills.bundle.js (polyfills) 597 kB [initial] [rendered]
      chunk {scripts} scripts.bundle.js (scripts) 4.01 MB [initial] [rendered]
      chunk {styles} styles.bundle.js (styles) 980 kB [initial] [rendered]
      chunk {vendor} vendor.bundle.js (vendor) 18 MB [initial] [rendered]

      webpack: Compiled successfully.
                
5.  Using Chrome, navigate to [localhost:1841](http://localhost:1841)


### Published Version Link<a name="published-version-link"></a>

* [bradyhouse.io](http://bradyhouse.github.io/angular2-cli/fiddle-0033-AgGridMasterDetail/index.html)


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


### Tags<a name="tags"></a>

node, angular 5.2.1, @ag-grid-community/core, @ag-grid-community/allModules, @ag-grid-enterprise/allModules, bootstrap
