fiddle-0021-EntAgGridState
======


### Title

AgGrid - Enterprise AgGrid State


### Creation Date

04-07-2019


### Location

Chicago, IL


### Issue

[Issue 299](https://github.com/bradyhouse/house/issues/299)


### Description




### Use Case

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

4.  Startup the fiddle -- `fiddle start angular2-cli 0020` 

        {{ ʕ・ɭ・ʔ }}
        
        FIDDLE-START.SH
        ├────STARTSERVER
        ├────NGINSTALL
        ├────NGSTART
        ├────NVMINSTALL
        v10.8.0 is already installed.
        Now using node v10.8.0 (npm v6.2.0)
        ├────NPMINSTALL
        npm WARN bootstrap@4.3.1 requires a peer of popper.js@^1.14.7 but none is installed. You must install peer dependencies yourself.
        
        audited 42442 packages in 8.91s
        found 1 low severity vulnerability
          run `npm audit fix` to fix them, or `npm audit` for details
        ** Angular Live Development Server is listening on localhost:1841, open your browser on http://localhost:1841/ **
        
        Date: 2019-03-17T19:12:07.501Z
        Hash: 0a91116a1a760001822d
        Time: 16366ms
        chunk {es2015-polyfills} es2015-polyfills.js, es2015-polyfills.js.map (es2015-polyfills) 284 kB [initial] [rendered]
        chunk {main} main.js, main.js.map (main) 17.7 kB [initial] [rendered]
        chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 259 kB [initial] [rendered]
        chunk {runtime} runtime.js, runtime.js.map (runtime) 6.08 kB [entry] [rendered]
        chunk {scripts} scripts.js, scripts.js.map (scripts) 980 kB [entry] [rendered]
        chunk {styles} styles.js, styles.js.map (styles) 2.16 MB [initial] [rendered]
        chunk {vendor} vendor.js, vendor.js.map (vendor) 6.07 MB [initial] [rendered]
        ℹ ｢wdm｣: Compiled successfully.
      

5.  Using Chrome, navigate to [localhost:1841](http://localhost:1841)
      
            
### Published Version Link

* [bradyhouse.io](http://bradyhouse.github.io/jquery/fiddle-0021-EntAgGridState/index.html)



### Tags

angular (7.2), ag-grid-enterprise, ag-grid, fetch, bootstrap, bootswatch



### Forked From

[fiddle-0019-EnterpriseAgGrid](../fiddle-0019-EnterpriseAgGrid)


### Forked From

[fiddle-0020-EntAgGridPivot](../fiddle-0020-EntAgGridPivot)
