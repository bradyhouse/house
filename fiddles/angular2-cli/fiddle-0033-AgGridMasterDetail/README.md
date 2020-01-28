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
        npm WARN bootstrap@4.3.1 requires a peer of popper.js@^1.14.7 but none is installed. You must install peer dependencies yourself.

        audited 17360 packages in 8.965s
        found 6 high severity vulnerabilities
        run `npm audit fix` to fix them, or `npm audit` for details
        10% building 3/3 modules 0 activeℹ ｢wds｣: Project is running at http://localhost:1841/webpack-dev-server/
        ℹ ｢wds｣: webpack output is served from /
        ℹ ｢wds｣: 404s will fallback to //index.html

        chunk {main} main.js, main.js.map (main) 20.2 kB [initial] [rendered]
        chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 251 kB [initial] [rendered]
        chunk {runtime} runtime.js, runtime.js.map (runtime) 6.09 kB [entry] [rendered]
        chunk {scripts} scripts.js, scripts.js.map (scripts) 4.29 MB [entry] [rendered]
        chunk {styles} styles.js, styles.js.map (styles) 1.13 MB [initial] [rendered]
        chunk {vendor} vendor.js, vendor.js.map (vendor) 8.53 MB [initial] [rendered]
        Date: 2019-10-21T01:17:06.474Z - Hash: 1845070d57716b1272aa - Time: 22263ms
        ** Angular Live Development Server is listening on localhost:1841, open your browser on http://localhost:1841/ **
        ℹ ｢wdm｣: Compiled successfully.
        
        
5.  Using Chrome, navigate to [localhost:1841](http://localhost:1841)

### Published Version Link<a name="link"></a>

N/A


### Tags<a name="tags"></a>

node, angular 5.2.1, @ag-grid-community/core, @ag-grid-community/allModules, @ag-grid-enterprise/allModules, bootstrap
