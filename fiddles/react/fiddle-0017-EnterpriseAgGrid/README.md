fiddle-0017-EnterpriseAgGrid
======


### Title

fiddle-0017-EnterpriseAgGrid


### Creation Date

10-24-21


### Location

Chicago, IL

<a name="issue"></a>
### Issue

[Issue 358](https://github.com/bradyhouse/house/issues/358)

<a name="description"></a>
### Description

What is the difference between using AgGrid with React vs. Angular?  [Angular fiddle #19](https://github.com/bradyhouse/house/tree/master/fiddles/angular2-cli/fiddle-0019-EnterpriseAgGrid) demonstrates how to customize the enterprise features of AgGrid using Angular.  What if it was re-written in React using hooks & packages? And what about leveraging jest to unit test each component? With regard to the unit testing pieces, can jest be configured to generate code coverage stats and produce its output in Junit XML format? And so, its time again to `Riddle me fiddle`.

<a name="reference"></a>
### Reference

In order to build out this fiddle, I referenced the following sites, pages and source code.

* [ag-grid > Custom Filter Example](https://www.ag-grid.com/react-data-grid/component-filter/#custom-filter-example)
* [ag-grid > Simple Header Component](https://www.ag-grid.com/react-data-grid/component-header/#simple-header-component)
* [ag-grid > Example: Custom Filter And Read-Only Floating Filter](https://www.ag-grid.com/react-data-grid/component-floating-filter/#example-custom-filter-and-read-only-floating-filter)
* [ag-grid > Simple Tool Panel Component](https://www.ag-grid.com/react-data-grid/component-tool-panel/#simple-tool-panel-component)
* [ag-grid > Trial License Key](https://www.ag-grid.com/react-data-grid/licensing/#trial-license-key)
* [github > ag-grid-react-hook-testing](https://github.com/seanlandsman/ag-grid-react-hook-testing)
* [jest > How To Use a Test Reporter With Create React App](https://codeburst.io/how-to-use-a-test-reporter-with-create-react-app-6c779f71f62)


<a name="startup-use-case"></a>
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

<a name="test-use-case"></a>
### Test Use Case

1.  Complete the [fiddle bash/alias setup procedure](https://github.com/bradyhouse/house/wiki/Setup-(Mac-OS))
2.  Test the fiddle -- `fiddle test react 0017` 
    
    ```
    ➜  house_master git:(358_react_16-25) ✗ fiddle test react 0017

    {{ ʕ・ɭ・ʔ }}

    FIDDLE-TEST.SH
    ├────REACTTEST
    ├────NVMINSTALL
    v16.11.1 is already installed.
    Now using node v16.11.1 (npm v8.0.0)
    ├────NPMINSTALL

    > enterpriseaggrid@0.1.0 test
    > react-scripts test --coverage --ci --testResultsProcessor="jest-junit" --watchAll=false

    PASS  src/app/App.test.js (9.394 s)
    PASS  src/app/components/content/content.test.js (9.394 s)
    PASS  src/app/components/rich-grid/rich-grid.test.js (9.74 s)
    PASS  src/app/components/top-nav/top-nav.test.js
    PASS  src/app/components/sub-nav/sub-nav.test.js
    ----------------------------------------|---------|----------|---------|---------|---------------------------------------------------------------
    File                                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
    ----------------------------------------|---------|----------|---------|---------|---------------------------------------------------------------
    All files                               |   52.47 |     49.2 |   30.76 |   52.12 |
    src                                    |       0 |        0 |       0 |       0 |
      index.js                              |       0 |      100 |       0 |       0 | 11-25
      reportWebVitals.js                    |       0 |        0 |       0 |       0 | 1-8
    src/app                                |     100 |      100 |     100 |     100 |
      App.js                                |     100 |      100 |     100 |     100 |
    src/app/components                     |       0 |        0 |       0 |       0 |
      index.js                              |       0 |        0 |       0 |       0 |
    src/app/components/content             |     100 |      100 |     100 |     100 |
      content.jsx                           |     100 |      100 |     100 |     100 |
    src/app/components/custom-group-header |   78.57 |       50 |   66.66 |   78.57 |
      custom-group-header.jsx               |   78.57 |       50 |   66.66 |   78.57 | 8-9,39
    src/app/components/custom-header       |   74.28 |    71.42 |   30.76 |   74.28 |
      custom-header.jsx                     |   74.28 |    71.42 |   30.76 |   74.28 | 15,33,53,66-81
    src/app/components/filter              |   12.82 |        0 |       0 |   12.82 |
      proficiency-filter.js                 |      20 |        0 |       0 |      20 | 25-98
      skill-filter.js                       |    5.26 |        0 |       0 |    5.26 | 22-93
    src/app/components/rich-grid           |   77.89 |       75 |   52.17 |   78.02 |
      rich-grid.jsx                         |   77.89 |       75 |   52.17 |   78.02 | 51-52,101-103,118,122,127,131,135,139-143,150-152,164,205,324
    src/app/components/sub-nav             |   26.66 |      100 |    8.33 |   26.66 |
      sub-nav.jsx                           |   26.66 |      100 |    8.33 |   26.66 | 10-47,56-57
    src/app/components/top-nav             |     100 |      100 |     100 |     100 |
      top-nav.jsx                           |     100 |      100 |     100 |     100 |
    src/app/data                           |     100 |      100 |     100 |     100 |
      ref-data.js                           |     100 |      100 |     100 |     100 |
    ----------------------------------------|---------|----------|---------|---------|---------------------------------------------------------------

    Test Suites: 5 passed, 5 total
    Tests:       5 passed, 5 total
    Snapshots:   0 total
    Time:        14.505 s
    Ran all test suites.
    The "0017" react fiddle has been tested successfully.
    ```

3.  This will generate (or update) the [junit.xml](junit.xml) file in the fiddle's root directory. Code coverage details are
    published to the [coverage](coverage) directory. These results can be accessed in the web browser by starting live-server
    from the [coverage\lcov-report](coverage/lcov-report) sub-directory.


<a name="published-links"></a>
### Published Version Link

  * [bradyhouse.github.io > react > #17](http://bradyhouse.github.io/react/fiddle-0017-EnterpriseAgGrid/#)

<a name="tags"></a>
### Tags

node, React, react-scripts, JSX, ES6, ag-grid-enterprise, ag-grid-react, enyzme, jasmine-reporters, jest, jest-cli, jest-dom, --dev jest-junit
