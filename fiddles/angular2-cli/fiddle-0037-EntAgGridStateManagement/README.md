fiddle-0037-EntAgGridStateManagement
======


### Title<a name="title"></a>

Enterprise AgGrid State Management


### Creation Date<a name="createDate"></a>

06-08-2020


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[Issue 347](https://github.com/bradyhouse/house/issues/347)


### Description<a name="description"></a>

Given a tricked out AgGrid configured to load Master / Detail data, I need to configure the grid so that the state of the grid persists across sessions.  Additionally, the user needs the ability to clear the persisted settings. 


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

4.  Startup the fiddle -- `fiddle start angular2-cli 0037` 

        {{ ʕ・ɭ・ʔ }}

        FIDDLE-START.SH
        ├────STARTSERVER
        ├────NGINSTALL
        ├────NGSTART
        ├────NVMINSTALL
        ...
                
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

* https://www.ag-grid.com/javascript-grid-tooltip-component/#example-custom-tooltip
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach


### Tags<a name="tags"></a>

node, angular 5.2.1, @ag-grid-community/core, @ag-grid-community/allModules, @ag-grid-enterprise/allModules, bootstrap


### Forked From

[fiddle-0036-EntAgGridToolTips](../fiddle-0036-EntAgGridToolTips)
