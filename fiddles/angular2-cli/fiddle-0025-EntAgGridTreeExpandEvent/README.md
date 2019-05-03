fiddle-0025-EntAgGridTreeExpandEvent
======


### Title<a name="title"></a>

Enterprise AgGrid Tree Expand Event


### Creation Date<a name="creation-date"></a>

04-29-2019


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[Issue 308](https://github.com/bradyhouse/house/issues/308)


### Description<a name="description"></a>

See [AgGrid - Updating Data](https://www.ag-grid.com/javascript-grid-data-update/).  Based on this, I need to extend my re-useable tree
component, [fiddle #23](http://github/bradyhouse/house/fiddles/angular2-cli/fiddle-0024-EntAgGridRowSelection), to support a row transaction being triggered when a node is expanded.  The workflow should be as follows--

1.  User expands a node. Specifically--

        *   (rowClicked)="onRowClicked($event)" ... event.node.allLeafChildren.length === 0 => expandBubble ...
        *   (rowGroupOpened)="onRowGroupOpened($event)"       

2.  If the selected node has no children, then a expand node event bubbles up to the hosting control
3.  The hosting control then initiates an ajax request for additional nodes
4.  On success, the nodes are added to the grid using a row transaction as described


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

4.  Startup the fiddle -- `fiddle start angular2-cli 0025` 

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

        audited 42451 packages in 5.917s
        found 2 vulnerabilities (1 low, 1 high)
          run `npm audit fix` to fix them, or `npm audit` for details
        ** Angular Live Development Server is listening on localhost:1841, open your browser on http://localhost:1841/ **

        Date: 2019-04-27T11:37:04.243Z
        Hash: 065116f2ecc0f16ae39c
        Time: 11373ms
        chunk {es2015-polyfills} es2015-polyfills.js, es2015-polyfills.js.map (es2015-polyfills) 284 kB [initial] [rendered]
        chunk {main} main.js, main.js.map (main) 35.5 kB [initial] [rendered]
        chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 260 kB [initial] [rendered]
        chunk {runtime} runtime.js, runtime.js.map (runtime) 6.08 kB [entry] [rendered]
        chunk {scripts} scripts.js, scripts.js.map (scripts) 980 kB [entry] [rendered]
        chunk {styles} styles.js, styles.js.map (styles) 2.41 MB [initial] [rendered]
        chunk {vendor} vendor.js, vendor.js.map (vendor) 6.79 MB [initial] [rendered]
        ℹ ｢wdm｣: Compiled successfully.

5.  Using Chrome, navigate to [localhost:1841](http://localhost:1841)
6.  To trigger a grid update transaction, expand any country node and click the "+" icon displayed on one of its children



      
            
### Published Version Link<a name="published-version-link"></a>

* [bradyhouse.io](http://bradyhouse.github.io/angular2-cli/fiddle-0025-EntAgGridTreeExpandEvent/index.html)


### Tags<a name="tags"></a>

angular (7.2), ag-grid-enterprise, ag-grid, fetch, bootstrap, bootswatch


### Forked From<a name="forked-from"></a>

[fiddle-0023-EntAgGridRowSelection](../fiddle-0023-EntAgGridRowSelection)
