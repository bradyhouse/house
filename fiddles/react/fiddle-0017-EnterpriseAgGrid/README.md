fiddle-0017-EnterpriseAgGrid
======


### Title

fiddle-0017-EnterpriseAgGrid


### Creation Date

10-24-21


### Location

Chicago, IL


### Issue

[Issue 358](https://github.com/bradyhouse/house/issues/358)


### Description

What is the difference between using AgGrid with React vs. Angular?  [Angular fiddle #19](https://github.com/bradyhouse/house/tree/master/fiddles/angular2-cli/fiddle-0019-EnterpriseAgGrid) demonstrates how to customize the enterprise features of AgGrid using Angular.  What if it was re-written in React? And what about leveraging jest to unit test each component.  `Riddle me fiddle` please.


### Startup Use Case

1.  Complete the [fiddle bash/alias setup procedure](https://github.com/bradyhouse/house/wiki/Setup-(Mac-OS))
2.  Obtain an Ag-grid enterprise (or evaluation) license
3.  Update the [resources.json](public/resources.json) file with the key (2)

Note - the fiddle will still work without a license.  However, you will see an error in the console (see below).
      
      ```
      ****************************************************************************************************************
      *************************************** ag-Grid Enterprise License *********************************************
      ********************************************* Invalid License **************************************************
      * Your license for ag-Grid Enterprise is not valid - please contact accounts@ag-grid.com to obtain a valid license. *
      ****************************************************************************************************************
      ****************************************************************************************************************
      ```

4.  Startup the fiddle -- `fiddle start react 0017`

      ```
      {{ ʕ・ɭ・ʔ }}

      FIDDLE-START.SH
      ├────STARTSERVER
      ├────REACTSTART
      ├────NVMINSTALL
      v16.11.1 is already installed.
      Now using node v16.11.1 (npm v8.0.0)
      ├────NPMINSTALL
      
      ...

      > enterpriseaggrid@0.1.0 start
      > react-scripts start

      Starting the development server...

      Compiled successfully!

      You can now view enterpriseaggrid in the browser.

        Local:            http://localhost:3000
        On Your Network:  http://10.0.0.14:3000

      Note that the development build is not optimized.
      To create a production build, use npm run build.

      ```

5.  Using Chrome, navigate to [localhost:3000](http://localhost:3000)


### Unit Test Use Case

1.  Complete the [fiddle bash/alias setup procedure](https://github.com/bradyhouse/house/wiki/Setup-(Mac-OS))
2.  Test the fiddle -- `fiddle test react 0017` 
    
    ```
    {{ ʕ・ɭ・ʔ }}

    FIDDLE-TEST.SH
    ├────REACTTEST
    ├────NVMINSTALL
    v16.11.1 is already installed.
    Now using node v16.11.1 (npm v8.0.0)
    ├────NPMINSTALL

    > enterpriseaggrid@0.1.0 test
    > react-scripts test --watchAll=false

    PASS  src/app/App.test.js (10.502 s)
    PASS  src/app/components/content/content.test.js (10.524 s)
    PASS  src/app/components/rich-grid/rich-grid.test.js (11.062 s)
    PASS  src/app/components/top-nav/top-nav.test.js
    PASS  src/app/components/sub-nav/sub-nav.test.js

    Test Suites: 5 passed, 5 total
    Tests:       5 passed, 5 total
    Snapshots:   0 total
    Time:        14.312 s
    Ran all test suites.
    The "0017" react fiddle has been tested successfully.

    ```


### Published Version Link

  * [bradyhouse.github.io > react > #17](http://bradyhouse.github.io/react/fiddle-0017-EnterpriseAgGrid/#)


### Tags

node, React, JSX, ES6, ag-grid-enterprise, ag-grid-react, enyzme, jest
