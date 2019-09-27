fiddle-0027-EntAgGridChart
======


### Title<a name="title"></a>

Enterprise AgGrid Chart Range API


### Creation Date<a name="creation-date"></a>

09-26-2019


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[Issue 313](https://github.com/bradyhouse/house/issues/313)


### Description<a name="description"></a>

Enterprise AgGrid Chart provides on-board charting API. Need a hello world (kitchen sink) example. 
As a starting point see [Chart Range API ](https://www.ag-grid.com/javascript-grid-charts-chart-range-api/).


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

4.  Startup the fiddle -- `fiddle start angular2-cli 0027` 

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
        
        up to date in 7.172s
         10% building 3/3 modules 0 activeℹ ｢wds｣: Project is running at http://localhost:1841/webpack-dev-server/
        ℹ ｢wds｣: webpack output is served from /
        ℹ ｢wds｣: 404s will fallback to //index.html
        
        chunk {main} main.js, main.js.map (main) 23.2 kB [initial] [rendered]
        chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 251 kB [initial] [rendered]
        chunk {runtime} runtime.js, runtime.js.map (runtime) 6.09 kB [entry] [rendered]
        chunk {scripts} scripts.js, scripts.js.map (scripts) 4.05 MB [entry] [rendered]
        chunk {styles} styles.js, styles.js.map (styles) 1.13 MB [initial] [rendered]
        chunk {vendor} vendor.js, vendor.js.map (vendor) 7.87 MB [initial] [rendered]
        Date: 2019-09-27T02:57:39.080Z - Hash: 9e818ee63d87e69b15bd - Time: 14029ms
        ** Angular Live Development Server is listening on localhost:1841, open your browser on http://localhost:1841/ **
        ℹ ｢wdm｣: Compiled successfully.
        

5.  Using Chrome, navigate to [localhost:1841](http://localhost:1841)
6.  Click one of the buttons in the top bar to test the onboard charting capabilities
      
            
### Published Version Link<a name="published-version-link"></a>

* [bradyhouse.io](http://bradyhouse.github.io/angular2-cli/fiddle-0027-EntAgGridChart/index.html)


### Tags<a name="tags"></a>

node v10.9.0, angular (8.2.0), ag-grid-enterprise, ag-grid, fetch, bootstrap, bootswatch

