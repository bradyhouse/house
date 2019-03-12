fiddle-0019-EnterpriseAgGrid
======


### Title

fiddle-0019-EnterpriseAgGrid


### Creation Date

03-11-19


### Location

Chicago, IL


### Issue

[Issue 295](https://github.com/bradyhouse/house/issues/295)


### Description

[ag-grid](https://www.ag-grid.com/) - the world's best javascript grid.  You know that one? Specifically, 
how does the [enterprise version](https://www.npmjs.com/package/ag-grid-enterprise) work with the angular cli?  `Riddle me a fiddle`, please.


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

4.  Startup the fiddle -- `fiddle start angular2-cli 0019` 

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
        
        audited 42442 packages in 10.221s
        found 1 low severity vulnerability
          run `npm audit fix` to fix them, or `npm audit` for details
        ** Angular Live Development Server is listening on localhost:1841, open your browser on http://localhost:1841/ **
                                                                                                   e Date: 2019-03-12T12:21:59.611Z
        Hash: 18502143ff15336951df
        Time: 21552ms
        chunk {es2015-polyfills} es2015-polyfills.js, es2015-polyfills.js.map (es2015-polyfills) 266 kB [initial] [rendered]
        chunk {main} main.js, main.js.map (main) 70 kB [initial] [rendered]
        chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 246 kB [initial] [rendered]
        chunk {runtime} runtime.js, runtime.js.map (runtime) 6.08 kB [entry] [rendered]
        chunk {scripts} scripts.js, scripts.js.map (scripts) 980 kB [entry] [rendered]
        chunk {styles} styles.js, styles.js.map (styles) 1.86 MB [initial] [rendered]
        chunk {vendor} vendor.js, vendor.js.map (vendor) 6.07 MB [initial] [rendered]
        ℹ ｢wdm｣: Compiled successfully.
      
5.  Using Chrome, navigate to [localhost:1841](http://localhost:1841)
      
            
### Published Version Link

* [bradyhouse.io](http://bradyhouse.github.io/jquery/fiddle-0019-EnterpriseAgGrid/index.html)



### Tags

angular (7.2), ag-grid-enterprise, ag-grid, fetch, bootstrap, bootswatch

