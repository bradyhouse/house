fiddle-0029-EntAgGridChartSeriesClick
======


### Title<a name="title"></a>

Enterprise AgGrid - Bar Chart Control


### Creation Date<a name="creation-date"></a>

09-26-2019


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[Issue 320](https://github.com/bradyhouse/house/issues/320)


### Description<a name="description"></a>

Can an AgGrid's charting features be configured to simply display bar chart independent of the grid? Riddle me a fiddle. Specifically, create a re-useable bar chart that accepts the row and columns like a normal aggrid instance, but renders the results as a bar chart instead of a grid.


### Use Case<a name="use-case"></a>

1.  Complete the [fiddle bash/alias setup procedure](https://github.com/bradyhouse/house/wiki/Setup-(Mac-OS))
2.  Obtain an Ag-grid enterprise (or evaluation) license
3.  Update the [src/assets/license.json](src/assets/license.json) file

Note - the fiddle will still work without a license.  However, you will see an error in the console (see below).

        ****************************************************************************************************************
        *************************************** ag-Grid Enterprise License *********************************************
        ********************************************* Invalid License **************************************************
        * Your license for ag-Grid Enterprise is not valid - please contact accounts@ag-grid.com to obtain a valid license. *
        ****************************************************************************************************************
        ****************************************************************************************************************

4.  Startup the fiddle -- `fiddle start angular2-cli 0028` 

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

        audited 17213 packages in 11.235s
        found 1 moderate severity vulnerability
        run `npm audit fix` to fix them, or `npm audit` for details
        10% building 3/3 modules 0 activeℹ ｢wds｣: Project is running at http://localhost:1841/webpack-dev-server/
        ℹ ｢wds｣: webpack output is served from /
        ℹ ｢wds｣: 404s will fallback to //index.html

        chunk {main} main.js, main.js.map (main) 27.5 kB [initial] [rendered]
        chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 251 kB [initial] [rendered]
        chunk {runtime} runtime.js, runtime.js.map (runtime) 6.09 kB [entry] [rendered]
        chunk {scripts} scripts.js, scripts.js.map (scripts) 4.05 MB [entry] [rendered]
        chunk {styles} styles.js, styles.js.map (styles) 1.13 MB [initial] [rendered]
        chunk {vendor} vendor.js, vendor.js.map (vendor) 7.88 MB [initial] [rendered]
        Date: 2019-10-16T11:13:43.973Z - Hash: c5d8460a802bea54cb8c - Time: 18440ms
        ** Angular Live Development Server is listening on localhost:1841, open your browser on http://localhost:1841/ **
        ℹ ｢wdm｣: Compiled successfully.
        

5.  Using Chrome, navigate to [localhost:1841](http://localhost:1841)
      
            
### Published Version Link<a name="published-version-link"></a>

* [bradyhouse.io](http://bradyhouse.github.io/angular2-cli/fiddle-0029-EntAgGridChartSeriesClick/index.html)


### Tags<a name="tags"></a>

node v10.9.0, angular (8.2.0), ag-grid, ag-grid-community ag-grid-angular, ag-grid-enterprise,fetch, bootstrap, bootswatch


### Forked From <a name="forked"></a>

[fiddle-0027-EntAgGridChart](../fiddle-0027-EntAgGridChart)


### Forked From

[fiddle-0028-EntAgGridBarChart](../fiddle-0028-EntAgGridBarChart)
